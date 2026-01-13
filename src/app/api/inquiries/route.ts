import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Discord 웹훅으로 알림 전송
async function sendDiscordNotification(inquiry: { name: string; phone: string; message: string }) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.error('Discord webhook URL이 설정되지 않았습니다.');
    return;
  }

  const embed = {
    title: '🔔 새로운 상담 문의가 접수되었습니다!',
    color: 0xED7620,
    fields: [
      {
        name: '👤 이름',
        value: inquiry.name,
        inline: true,
      },
      {
        name: '📞 전화번호',
        value: inquiry.phone,
        inline: true,
      },
      {
        name: '💬 문의 내용',
        value: inquiry.message || '(내용 없음)',
        inline: false,
      },
    ],
    footer: {
      text: '대광생활건강',
    },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });
  } catch (error) {
    console.error('Discord 알림 전송 실패:', error);
  }
}

// GET: 모든 문의 조회
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase 조회 오류:', error);
      return NextResponse.json({ error: '문의 조회에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('문의 조회 실패:', error);
    return NextResponse.json({ error: '문의 조회에 실패했습니다.' }, { status: 500 });
  }
}

// POST: 새 문의 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: '이름과 전화번호는 필수입니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert([
        {
          name,
          phone,
          message: message || '',
          status: '대기중',
          manager: '대광생활건강',
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase 삽입 오류:', error);
      return NextResponse.json({ error: '문의 등록에 실패했습니다.' }, { status: 500 });
    }

    // Discord로 알림 전송
    await sendDiscordNotification({ name, phone, message: message || '' });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('문의 등록 실패:', error);
    return NextResponse.json({ error: '문의 등록에 실패했습니다.' }, { status: 500 });
  }
}

// PATCH: 문의 상태 업데이트
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'ID와 상태는 필수입니다.' }, { status: 400 });
    }

    const validStatuses = ['대기중', '연락완료', '상담완료'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: '유효하지 않은 상태입니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase 업데이트 오류:', error);
      return NextResponse.json({ error: '상태 업데이트에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('상태 업데이트 실패:', error);
    return NextResponse.json({ error: '상태 업데이트에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE: 문의 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID는 필수입니다.' }, { status: 400 });
    }

    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Supabase 삭제 오류:', error);
      return NextResponse.json({ error: '문의 삭제에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('문의 삭제 실패:', error);
    return NextResponse.json({ error: '문의 삭제에 실패했습니다.' }, { status: 500 });
  }
}
