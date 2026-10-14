'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type WaitlistDialogProps = { children: ReactNode };

export default function WaitlistDialog({ children }: WaitlistDialogProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'joined' | 'error'>('idle');
  const [error, setError] = useState('');

  async function joinWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus('sending');
    setError('');

    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          consent: form.get('consent') === 'on',
          website: form.get('website'),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We couldn’t add you just now. Please try again.');
      setStatus('joined');
      formElement.reset();
    } catch (submissionError) {
      setStatus('error');
      setError(submissionError instanceof Error ? submissionError.message : 'We couldn’t add you just now. Please try again.');
    }
  }

  return <Dialog onOpenChange={open => { if (!open) { setStatus('idle'); setError(''); } }}>
    <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="waitlist-dialog">
      {status === 'joined' ? <div className="waitlist-success" role="status">
        <span className="waitlist-success-mark"><Check size={23}/></span>
        <p className="eyebrow">YOU’RE ON THE FIRST WAVE</p>
        <DialogTitle>You’re on the list.</DialogTitle>
        <DialogDescription>We’ll send a note to your inbox as soon as Marlin is ready to welcome its first guests. Until then, dream a little of the sea.</DialogDescription>
      </div> : <>
        <p className="eyebrow">A LITTLE CLOSER TO THE SEA</p>
        <DialogTitle>Be first to the shoreline.</DialogTitle>
        <DialogDescription>Marlin is taking shape by the shore. Leave us your email and we’ll let you know when the first stay is ready.</DialogDescription>
        <form className="waitlist-form" onSubmit={joinWaitlist}>
          <label>Your name <span className="optional-label">OPTIONAL</span><input name="name" type="text" maxLength={80} autoComplete="name" placeholder="What should we call you?"/></label>
          <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com"/></label>
          <label className="waitlist-consent"><input name="consent" type="checkbox" required/><span>Send me Marlin’s opening news and launch updates by email. I can unsubscribe any time.</span></label>
          <label className="waitlist-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off"/></label>
          {status === 'error' && <p className="waitlist-error" role="alert">{error}</p>}
          <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Saving your place…' : 'Save me a place'} <ArrowUpRight size={18}/></Button>
          <p className="waitlist-note">Just a note when the shore is ready.</p>
        </form>
      </>}
    </DialogContent>
  </Dialog>;
}
