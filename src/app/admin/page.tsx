'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: '대기중' | '연락완료' | '상담완료';
  manager: string;
  created_at: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<'전체' | '대기중' | '연락완료' | '상담완료'>('전체');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 환경변수의 비밀번호와 비교 (클라이언트에서는 하드코딩된 값 사용)
    if (password === 'daekwang2024!') {
      setIsAuthenticated(true);
      setError('');
      fetchInquiries();
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/inquiries');
      if (response.ok) {
        const data = await response.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error('문의 조회 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    try {
      const response = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        setInquiries(prev =>
          prev.map(inq => (inq.id === id ? { ...inq, status } : inq))
        );
      }
    } catch (err) {
      console.error('상태 업데이트 실패:', err);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/inquiries?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error('문의 삭제 실패:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: Inquiry['status']) => {
    switch (status) {
      case '대기중':
        return 'bg-yellow-100 text-yellow-800';
      case '연락완료':
        return 'bg-blue-100 text-blue-800';
      case '상담완료':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = filter === '전체'
    ? inquiries
    : inquiries.filter(inq => inq.status === filter);

  const statusCounts = {
    전체: inquiries.length,
    대기중: inquiries.filter(inq => inq.status === '대기중').length,
    연락완료: inquiries.filter(inq => inq.status === '연락완료').length,
    상담완료: inquiries.filter(inq => inq.status === '상담완료').length,
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">관리자 로그인</h1>
            <p className="text-gray-600">대광생활건강 어드민 페이지</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">대광생활건강</h1>
              <p className="text-sm text-gray-600">상담 문의 관리</p>
            </div>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(['전체', '대기중', '연락완료', '상담완료'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`p-4 rounded-xl transition-all ${
                filter === status
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-900 hover:shadow-md'
              }`}
            >
              <div className="text-2xl font-bold">{statusCounts[status]}</div>
              <div className={`text-sm ${filter === status ? 'text-white/80' : 'text-gray-600'}`}>
                {status}
              </div>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">문의 목록</h2>
              <button
                onClick={fetchInquiries}
                className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                새로고침
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-gray-500">
              로딩 중...
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              문의가 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      접수일시
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      문의내용
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      관리
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      작업
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(inquiry.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {inquiry.phone}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {inquiry.message || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry.id, e.target.value as Inquiry['status'])}
                          className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${getStatusColor(inquiry.status)}`}
                        >
                          <option value="대기중">대기중</option>
                          <option value="연락완료">연락완료</option>
                          <option value="상담완료">상담완료</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {inquiry.manager}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => deleteInquiry(inquiry.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
