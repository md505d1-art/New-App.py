// Optional online brain for Hana: Claude via the official Anthropic SDK, using an API key the user adds
// in Profile → Hana AI. The key is stored only on this device and sent only to Anthropic.
import { S } from './store.js';

let Anthropic = null;
async function client() {
  if (!Anthropic) Anthropic = (await import('../vendor/anthropic-sdk.js')).default;
  return new Anthropic({ apiKey: S.aiKey, dangerouslyAllowBrowser: true, maxRetries: 1, timeout: 30000 });
}

const SYSTEM = `You are Hana, the friendly guide in Sprout, a learning app for a UK Year 11 student revising for GCSEs, learning languages and playing chess. Your personality: a cheerful, slightly dramatic inventor with teal hair and an orange jacket. You are always halfway through building something (usually a jetpack for Bit), you love strawberry mochi, your favourite subject is physics, you're very competitive at chess (the King's Gambit is your favourite opening) and you say "eureka" when something clicks. You're fiercely on the student's side: warm, encouraging, never sarcastic about their mistakes. Bit is your small floating triangle robot: deadpan and a bit cheeky. Now and then you can quote him briefly ("Bit says...").
If asked, be honest that you are an AI character in the app, not a real person.

You are on a voice call, so everything you write is read aloud:
- Reply in 1 to 3 short sentences. No lists, markdown, emoji or headings.
- Teach step by step: explain one idea simply, give a quick example, then ask one question to check understanding. Wait for the answer before moving on.
- When the student answers, say clearly whether they're right, explain briefly, and ask the next question.
- Keep facts accurate to GCSE level and mention when exam boards differ (AQA, Edexcel, Eduqas).
- If they're stressed or tired, be kind and suggest something small.
- If asked something unsafe or inappropriate for a teenager, gently steer back to learning.`;

export async function askHanaAI(history, ctx) {
  const anthropic = await client();
  const about = `Student: ${ctx.name || 'unknown name'}. Exam board preference: ${ctx.board === 'all' ? 'not set' : ctx.board}. Streak: ${ctx.streak} days. Courses started: ${ctx.courses.join(', ') || 'none yet'}. Facts due for revision: ${ctx.due}. Your friendship level with them: ${ctx.friendship || 'new friends'}. ${ctx.lastTopic ? `Last topic you did together: ${ctx.lastTopic}. ` : ''}Time of day: ${ctx.timeOfDay || 'unknown'}${ctx.timeOfDay === 'late' ? ' (gently suggest sleep soon)' : ''}.`;
  // The conversation must start with a user turn and alternate; merge consecutive same-role turns.
  const msgs = [];
  for (const m of history) {
    if (!msgs.length && m.role !== 'user') continue;
    const prev = msgs[msgs.length - 1];
    if (prev && prev.role === m.role) prev.content += `\n${m.content}`; else msgs.push({ role: m.role, content: m.content });
  }
  try {
    const res = await anthropic.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 2000,
      output_config: { effort: 'low' }, // quick, conversational replies
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: `${SYSTEM}\n\n${about}`,
      messages: msgs,
    });
    if (res.stop_reason === 'refusal') return 'Let\'s talk about something else. What would you like to learn?';
    const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join(' ').trim();
    return text || 'Sorry, I lost my train of thought. Could you say that again?';
  } catch (e) {
    if (e instanceof Anthropic.AuthenticationError || e instanceof Anthropic.PermissionDeniedError) throw new Error('key');
    throw e;
  }
}

export async function testKey() {
  const r = await askHanaAI([{ role: 'user', content: 'Say hi in five words.' }], { name: S.name, board: S.board, streak: 0, courses: [], due: 0 });
  return r;
}
