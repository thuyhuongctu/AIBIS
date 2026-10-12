/* BizOn AIBIS — Tài liệu nền cho các phương thức thâm nhập (bảng tra máy đọc được)
 * © 2026 Đỗ Thùy Hương & Phan Anh Tú. Bảo lưu mọi quyền.
 *
 * Mỗi mục là một công trình ĐÃ ĐỐI CHIẾU với bản PDF gốc (thư mục Drive "5. AIBIS", 12/10/2026).
 * `finding` chỉ ghi điều bài báo tự nêu; `informs` chỉ ra phần nào của engine/mô hình mà bài này làm căn cứ;
 * `calibrationNote` ghi chỗ mô hình hiện tại cần đối chiếu khi hiệu chỉnh — KHÔNG phải tham số đã ước lượng.
 * Bảng này không đổi điểm số: engine (entry-mode-engine.js v0.1.0) và tham số (entry-mode-models.js) giữ nguyên.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.BizOnEntryModeLiterature = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const sources = [
    {
      id: 'maekelburger2012',
      citation: 'Maekelburger, B., Schwens, C., & Kabst, R. (2012). Asset specificity and foreign market entry mode choice of small and medium-sized enterprises: The moderating influence of knowledge safeguards and institutional safeguards. Journal of International Business Studies, 43, 458–476.',
      doi: '10.1057/jibs.2012.12',
      design: '206 entries by German SMEs into 26 countries; equity (JV, WOS) vs non-equity (export, contractual) modes.',
      finding: 'Asset specificity raises the likelihood of equity modes; knowledge safeguards (international experience, host-country networks) and institutional safeguards (property-rights protection, cultural proximity) weaken this effect.',
      theories: ['TCE'],
      modes: ['joint_venture', 'wholly_owned_fdi', 'export', 'licensing'],
      informs: ['knowledgeProtection', 'minInternationalExperience', 'country.ipProtection'],
      calibrationNote: 'Supports the ipProtection term in licensing countryFit. The study groups JV with WOS as equity modes, yet the model gives JV knowledgeProtection 45, below export (55): review this value when calibrating.'
    },
    {
      id: 'blomstermo2006',
      citation: 'Blomstermo, A., Sharma, D. D., & Sallis, J. (2006). Choice of foreign market entry mode in service firms. International Marketing Review, 23(2), 211–229.',
      doi: '10.1108/02651330610660092',
      design: '140 Swedish service firms; logistic regression of high- vs low-control modes.',
      finding: 'Soft-service firms are far more likely than hard-service firms to choose high-control modes; greater cultural distance raises the likelihood of high control in services. Prior foreign-market experience was not significant.',
      theories: ['TCE'],
      modes: ['wholly_owned_fdi', 'export', 'licensing', 'strategic_alliance'],
      informs: ['control', 'country.culturalDistance'],
      calibrationNote: 'Service type is not yet a firm attribute in the engine; a firm.serviceType input would be needed to reflect this result.'
    },
    {
      id: 'beugelsdijk2018',
      citation: 'Beugelsdijk, S., Kostova, T., Kunst, V. E., Spadafora, E., & van Essen, M. (2018). Cultural distance and firm internationalization: A meta-analytical review and theoretical implications. Journal of Management, 44(1), 89–130.',
      doi: '10.1177/0149206317729027',
      design: 'Meta-analysis of 156 studies (1988–2015).',
      finding: 'Cultural distance lowers the likelihood of entering a country and favours greenfield over acquisition, but has no significant effect on the JV vs wholly-owned choice or on the degree of ownership. Results depend on the cultural framework and on the home-country type.',
      theories: ['Institutional'],
      modes: ['joint_venture', 'wholly_owned_fdi'],
      informs: ['country.culturalDistance', 'distancePenalty'],
      calibrationNote: 'Consistent with applying the distance penalty equally to all modes; argues against making cultural distance shift JV vs WOS.'
    },
    {
      id: 'elmoez2021',
      citation: 'Elmoez, Z., Zorgati, I., & Alessa, A. A. (2021). Cultural distance and corporate internationalization: Evidence from emerging economies. Journal of Asian Finance, Economics and Business, 8(3), 267–275.',
      doi: '10.13106/jafeb.2021.vol8.no3.0267',
      design: '163 FDI entries into Saudi Arabia from nine emerging economies; logit of JV (1) vs WOS (0).',
      finding: 'Greater cultural distance (Hofstede, GLOBE, Schwartz) favours wholly-owned subsidiaries over joint ventures; longer prior presence in the host country favours joint ventures.',
      theories: ['TCE'],
      modes: ['joint_venture', 'wholly_owned_fdi'],
      informs: ['country.culturalDistance'],
      calibrationNote: 'Single-host evidence that differs from the meta-analysis above; treat as context-specific (see META principle).'
    },
    {
      id: 'ojala2008',
      citation: 'Ojala, A., & Tyrväinen, P. (2008). Market entry decisions of US small and medium-sized software firms. Management Decision, 46(2), 187–200.',
      doi: '10.1108/00251740810854113',
      design: '100 US software SMEs and their direct operations in 38 countries; stepwise regression.',
      finding: 'The size of the target country\'s software market is the strongest predictor of where firms set up direct operations; cultural and geographic distance, GDP and country risk are weaker. This is a market-selection study, not a test of entry-mode choice.',
      theories: ['Location choice'],
      modes: ['wholly_owned_fdi', 'digital_entry'],
      informs: ['country.marketSize'],
      calibrationNote: 'Supports the marketSize term in the wholly-owned FDI countryFit; does not inform the choice between modes.'
    },
    {
      id: 'hult2020',
      citation: 'Hult, G. T. M., Gonzalez-Perez, M. A., & Lagerström, K. (2020). The theoretical evolution and use of the Uppsala Model of internationalization in the international business ecosystem. Journal of International Business Studies, 51(1), 38–49.',
      doi: '10.1057/s41267-019-00293-x',
      design: 'Invited commentary on the Uppsala model (Johanson & Vahlne, 1977, 2009, 2017).',
      finding: 'Internationalisation proceeds gradually: firms enter psychically close markets through low-commitment modes and increase commitment as experiential knowledge and network positions grow.',
      theories: ['Uppsala'],
      modes: ['export', 'joint_venture', 'wholly_owned_fdi'],
      informs: ['minInternationalExperience', 'learning'],
      calibrationNote: 'Supports experience thresholds rising from export to wholly-owned FDI; a process model, not a mode-choice test.'
    },
    {
      id: 'aguilera2020',
      citation: 'Aguilera, R. V., Crespí-Cladera, R., Infantes, P. M., & Pascual-Fuster, B. (2020). Business groups and internationalization: Effective identification and future agenda. Journal of World Business, 55, Article 101050.',
      doi: '10.1016/j.jwb.2019.101050',
      design: 'Content analysis of top IB journals; algorithm to identify hierarchical business groups.',
      finding: 'Reviews evidence that business-group affiliation shapes internationalisation, including that group-affiliated local partners can be preferable joint-venture partners where national rules restrict foreign investment. Does not test entry-mode choice itself.',
      theories: ['Institutional', 'Network'],
      modes: ['joint_venture', 'strategic_alliance'],
      informs: ['country.localPartnerValue'],
      calibrationNote: 'Supports the localPartnerValue term in JV and alliance countryFit.'
    }
  ];

  return Object.freeze({
    version: '2026-10-12',
    sources: Object.freeze(sources.map(Object.freeze)),
    byId: Object.freeze(Object.fromEntries(sources.map(s => [s.id, s]))),
    forMode: modeId => sources.filter(s => s.modes.includes(modeId))
  });
});
