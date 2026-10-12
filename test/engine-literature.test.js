'use strict';
/* Kiểm thử engine chấm phương thức thâm nhập và bảng tài liệu nền. © 2026 Đỗ Thùy Hương & Phan Anh Tú. */
const assert = require('node:assert/strict');
const E = require('../js/aibis/entry-mode-engine.js');
const M = require('../js/aibis/entry-mode-models.js');
const L = require('../js/aibis/literature.js');

const ctx = {
  priorities: { control: 55, speed: 70, learning: 65, capitalEfficiency: 75, riskCompatibility: 40 },
  firm: { financialCapacity: 40, internationalExperience: 30, digitalCapability: 60 },
  country: { marketSize: 86, institutionalDistance: 60, culturalDistance: 71, ipProtection: 85, politicalRisk: 15, digitalReadiness: 95 }
};

// 1. Sáu phương thức, mỗi phương thức đủ các thuộc tính engine dùng
assert.equal(M.modes.length, 6);
const need = ['control', 'speed', 'learning', 'capitalRequirement', 'risk', 'knowledgeProtection', 'localEmbeddedness',
  'digitalScalability', 'minFinancialCapacity', 'minInternationalExperience', 'minDigitalCapability', 'evidenceConfidence'];
M.modes.forEach(m => need.forEach(k => assert.ok(Number.isFinite(m[k]), `${m.id}.${k}`)));

// 2. Tất định: cùng đầu vào cho cùng kết quả
assert.deepEqual(E.rankModes(M.modes, ctx), E.rankModes(M.modes, ctx));

// 3. Điểm trong 0–100, xếp hạng giảm dần, trọng số chuẩn hóa tổng bằng 1
const ranked = E.rankModes(M.modes, ctx);
ranked.forEach(r => assert.ok(r.score >= 0 && r.score <= 100, r.modeId));
for (let i = 1; i < ranked.length; i++) assert.ok(ranked[i - 1].score >= ranked[i].score);
const w = E.normalizeWeights(ctx.priorities);
assert.ok(Math.abs(Object.values(w).reduce((a, b) => a + b, 0) - 1) < 1e-12);

// 4. compareModes nhất quán với scoreMode
const c = E.compareModes(M.modes[0], M.modes[1], ctx);
const s0 = E.scoreMode(M.modes[0], ctx).score, s1 = E.scoreMode(M.modes[1], ctx).score;
assert.equal(c.difference, Number(Math.abs(s0 - s1).toFixed(2)));

// 5. Khoảng cách văn hóa/thể chế trừ điểm như nhau cho mọi phương thức (phù hợp Beugelsdijk et al., 2018)
const near = { ...ctx, country: { ...ctx.country, culturalDistance: 0, institutionalDistance: 0 } };
const far = { ...ctx, country: { ...ctx.country, culturalDistance: 100, institutionalDistance: 0 } };
const delta = M.modes.map(m => E.scoreMode(m, near).components.distancePenalty - E.scoreMode(m, far).components.distancePenalty);
assert.ok(delta.every(d => d === delta[0]));

// 6. Ngưỡng kinh nghiệm quốc tế tăng dần từ xuất khẩu đến FDI 100% vốn (Uppsala; Hult et al., 2020)
const exp = id => M.modes.find(m => m.id === id).minInternationalExperience;
assert.ok(exp('export') < exp('joint_venture') && exp('joint_venture') < exp('wholly_owned_fdi'));

// 7. Bảng tài liệu: mã định danh duy nhất, có DOI, chỉ trỏ tới phương thức và lý thuyết có thật
const ids = new Set(M.modes.map(m => m.id));
const seen = new Set();
L.sources.forEach(s => {
  assert.ok(!seen.has(s.id), 'trùng ' + s.id); seen.add(s.id);
  assert.match(s.doi, /^10\.\d{4,9}\/\S+$/, s.id);
  assert.ok(s.citation && s.finding && s.calibrationNote, s.id);
  s.modes.forEach(id => assert.ok(ids.has(id), `${s.id}: phương thức không tồn tại ${id}`));
  s.informs.forEach(f => {
    const ok = f.startsWith('country.') || need.includes(f) || E.DIMENSIONS.includes(f) || f === 'distancePenalty';
    assert.ok(ok, `${s.id}: trường không tồn tại ${f}`);
  });
});
// Mỗi phương thức có ít nhất một tài liệu nền, trừ Digital Entry chỉ dựa vào tài liệu đã có trong models.refs
M.modes.filter(m => m.id !== 'digital_entry').forEach(m => assert.ok(L.forMode(m.id).length > 0, m.id));

console.log('Tất cả kiểm thử engine và tài liệu nền đạt.');
