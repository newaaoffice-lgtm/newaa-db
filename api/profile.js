import { ImageResponse } from '@vercel/og';
export const config = { runtime: 'edge' };

const h = (type, props, children) => ({ type, props: { ...props, children } });

export default function handler(req) {
  const q = new URL(req.url).searchParams;
  const name = q.get('name') || 'User';
  const avatar = q.get('avatar') || '';
  const level = q.get('level') || '0';
  const exp = Number(q.get('exp') || 0);
  const next = Number(q.get('next') || 100);
  const coin = q.get('coin') || '0';
  const rank = q.get('rank') || '-';
  const pct = Math.min(100, Math.round((exp / next) * 100));
  const color = '#' + (q.get('color') || '4FC3F7').replace('#', '');

  return new ImageResponse(
    h('div', {
      style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center',
               padding: 40, background: '#1e1f2b', color: 'white' }
    }, [
      avatar ? h('img', { src: avatar, width: 160, height: 160,
                          style: { borderRadius: 80, marginRight: 40 } }) : null,
      h('div', { style: { display: 'flex', flexDirection: 'column', flex: 1 } }, [
        h('div', { style: { fontSize: 44, fontWeight: 700 } }, name),
        h('div', { style: { fontSize: 26, marginTop: 8, color } }, `Level ${level} • Rank #${rank}`),
        h('div', { style: { display: 'flex', width: '100%', height: 22, background: '#33354a',
                            borderRadius: 11, marginTop: 24 } },
          h('div', { style: { width: `${pct}%`, height: 22, background: color, borderRadius: 11 } }, '')),
        h('div', { style: { fontSize: 22, marginTop: 12 } }, `${exp} / ${next} XP • 🪙 ${coin}`),
      ]),
    ].filter(Boolean)),
    { width: 800, height: 280 }
  );
}
