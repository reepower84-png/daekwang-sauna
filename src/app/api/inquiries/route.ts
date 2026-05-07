import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL 환경변수가 설정되지 않았습니다.');
      return NextResponse.json({ error: '서버 설정 오류로 문의 등록에 실패했습니다.' }, { status: 500 });
    }

    const body = await request.json();
    const { name, phone, message } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: '이름과 전화번호는 필수입니다.' }, { status: 400 });
    }

    const embed = {
      title: '🔔 새로운 상담 문의가 접수되었습니다!',
      color: 0xED7620,
      fields: [
        {
          name: '👤 이름',
          value: name,
          inline: true,
        },
        {
          name: '📞 전화번호',
          value: phone,
          inline: true,
        },
        {
          name: '💬 문의 내용',
          value: message || '(내용 없음)',
          inline: false,
        },
      ],
      footer: {
        text: '대광생활건강',
      },
      timestamp: new Date().toISOString(),
    };

    const discordResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [embed],
      }),
    });

    if (!discordResponse.ok) {
      console.error('Discord 전송 실패:', discordResponse.status);
      return NextResponse.json({ error: '문의 등록에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('문의 등록 실패:', error);
    return NextResponse.json({ error: '문의 등록에 실패했습니다.' }, { status: 500 });
  }
}
