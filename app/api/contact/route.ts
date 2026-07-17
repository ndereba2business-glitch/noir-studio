import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Forge Eleven Contact <onboarding@resend.dev>',
      to: 'ndereba2business@gmail.com',
      subject: `New enquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #080808; color: #f0ede6;">
          <h2 style="color: #c9a96e; font-size: 24px; margin-bottom: 32px;">New Client Enquiry</h2>
          <p style="margin-bottom: 8px; color: rgba(240,237,230,0.6); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">From</p>
          <p style="margin-bottom: 24px; font-size: 18px;">${name}</p>
          <p style="margin-bottom: 8px; color: rgba(240,237,230,0.6); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Email</p>
          <p style="margin-bottom: 24px; font-size: 18px;">${email}</p>
          <p style="margin-bottom: 8px; color: rgba(240,237,230,0.6); font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;">Message</p>
          <p style="font-size: 16px; line-height: 1.7; color: rgba(240,237,230,0.8);">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
