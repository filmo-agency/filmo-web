export const prerender = false; // Le dice a Astro que esto NO es estático, debe correr en Vercel Edge/Serverless.

import type { APIRoute } from 'astro';


export const GET: APIRoute = ({ request }) => {
  const url = new URL(request.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');

  const VERIFY_TOKEN = import.meta.env.IG_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    return new Response(challenge, { status: 200 });
  } else {
    return new Response('Forbidden', { status: 403 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log('Received IG Webhook Event:', JSON.stringify(body));

    // Despachar el webhook a Vercel para hacer el re-build
    const VERCEL_DEPLOY_HOOK = import.meta.env.VERCEL_DEPLOY_HOOK_URL;

    if (VERCEL_DEPLOY_HOOK) {
      await fetch(VERCEL_DEPLOY_HOOK, {
        method: 'POST',
      });
      console.log('Triggered Vercel Deploy Hook successfully');
    } else {
      console.warn('Falta VERCEL_DEPLOY_HOOK_URL en las variables de entorno');
    }

    return new Response('EVENT_RECEIVED', { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return new Response('Error handling webhook', { status: 500 });
  }
};
