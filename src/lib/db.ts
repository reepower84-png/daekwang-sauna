import fs from 'fs';
import path from 'path';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  message: string;
  status: '대기중' | '연락완료' | '상담완료';
  manager: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'inquiries.json');

// 데이터베이스 파일 초기화
function initDB() {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
  }
}

// 모든 문의 조회
export function getAllInquiries(): Inquiry[] {
  initDB();
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

// 문의 추가
export function addInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'manager' | 'createdAt'>): Inquiry {
  initDB();
  const inquiries = getAllInquiries();

  const newInquiry: Inquiry = {
    id: Date.now().toString(),
    ...inquiry,
    status: '대기중',
    manager: '대광생활건강',
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  fs.writeFileSync(DB_PATH, JSON.stringify(inquiries, null, 2));

  return newInquiry;
}

// 문의 상태 업데이트
export function updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
  initDB();
  const inquiries = getAllInquiries();
  const index = inquiries.findIndex(inq => inq.id === id);

  if (index === -1) return null;

  inquiries[index].status = status;
  fs.writeFileSync(DB_PATH, JSON.stringify(inquiries, null, 2));

  return inquiries[index];
}

// 문의 삭제
export function deleteInquiry(id: string): boolean {
  initDB();
  const inquiries = getAllInquiries();
  const filtered = inquiries.filter(inq => inq.id !== id);

  if (filtered.length === inquiries.length) return false;

  fs.writeFileSync(DB_PATH, JSON.stringify(filtered, null, 2));
  return true;
}
