# AIBIS Global Market Engine

**AIBIS: a deterministic engine for choosing international market-entry modes, for teaching international business**

Phan Anh Tu ([ORCID 0000-0003-0667-3137](https://orcid.org/0000-0003-0667-3137); patu@ctu.edu.vn) and Do Thuy Huong ([ORCID 0000-0002-7711-2487](https://orcid.org/0000-0002-7711-2487); thuyhuongctu@gmail.com)
School of Economics, Can Tho University, Vietnam

Status: **Preview (v0.1.0)**. The parameters are illustrative and the model has not yet been calibrated; see *Limitations*.

## Overview

AIBIS (Tier 2B of the BizOn ecosystem) scores six international market-entry modes for a firm profile and a host-country profile: export, licensing, joint venture, strategic alliance, wholly-owned FDI and digital entry. Each mode is scored on eight priority dimensions with published weights:

- control
- speed
- learning
- capital efficiency
- risk compatibility
- knowledge protection
- local embeddedness
- digital scalability

The score also adds a firm-capability fit, a host-country fit and a cultural–institutional distance term. The same inputs always return the same ranking, so learners can trace why one mode outranks another and instructors can grade the reasoning.

## Contents

| Path | Role |
|---|---|
| `js/aibis/entry-mode-engine.js` | Scoring engine v0.1.0: `scoreMode`, `rankModes`, `compareModes` |
| `js/aibis/entry-mode-models.js` | The six modes, their parameters, theoretical bases and `evidenceConfidence` |
| `js/aibis/literature.js` | **Literature base**: seven verified sources, each linked to the modes, parameters and country terms it informs, with calibration notes |
| `js/aibis/country-profile-*.js` | Country-data contract (schema 1.0). Every indicator must carry its source, URL, reference year, licence and confidence before it can enter the engine |
| `js/aibis/country-role-view.js`, `round-swap.js`, `anchor-profiles.js` | Home/host role view, role swap at mid-game and frozen, hashed snapshots for reproducible scoring |
| `js/decision-log.js` | Decision-log schema shared with BizOn, vendored so that `round-swap.js` runs on its own |
| `index.html` | The preview page (https://thuyhuongctu.github.io/BizOn/aibis-entry-mode-preview.html) |
| `docs/` | Architecture note and the country-data roadmap |
| `test/` | Contract tests (`npm test`) |

**The preview page uses its own simplified illustrative score**, computed in `entry-mode-preview.js` from `entry-mode-preview-data.js`. It does not call the engine. The engine runs in the AIBIS workspace of BizOn (https://thuyhuongctu.github.io/BizOn/app/aibis.html). That workspace stays in BizOn because it uses BizOn's shared app shell and instructor gradebook.

## Model

For mode *m*, firm *f* and country *c*:

$$S_m = 0.55\,P_m + 0.20\,K_{m,f} + 0.20\,C_{m,c} + 0.05\,(100 - D_c)$$

- $P_m$ is the weighted fit between the mode's attributes and the learner's priorities.
- $K_{m,f}$ is the fit between the mode's capability thresholds and the firm's financial capacity, international experience and digital capability.
- $C_{m,c}$ is the mode-specific country fit.
- $D_c$ is the mean of the institutional and cultural distance indices.

The distance term is the same for every mode. This is consistent with the meta-analytic finding that cultural distance does not shift the joint-venture versus wholly-owned choice (Beugelsdijk et al., 2018).

## Literature base

`js/aibis/literature.js` records, for each source, the design, the finding as stated in the paper, the engine elements it informs and a calibration note. Every source was checked against the original article.

- **Transaction cost economics.** Asset specificity pushes SMEs towards equity modes; knowledge and institutional safeguards weaken this effect (Maekelburger et al., 2012). Soft-service firms prefer high-control modes (Blomstermo et al., 2006).
- **Distance.** Cultural distance lowers the likelihood of entry and favours greenfield investment, but does not decide between joint venture and wholly-owned entry (Beugelsdijk et al., 2018). A single-host study finds the opposite for Saudi Arabia (Elmoez et al., 2021), which illustrates how results depend on context.
- **Process and location.** The Uppsala model describes gradual commitment as experiential knowledge grows (Hult et al., 2020). Market size is the main driver of where software SMEs set up operations (Ojala & Tyrväinen, 2008).
- **Institutions and groups.** Business-group-affiliated local partners matter where foreign ownership is restricted (Aguilera et al., 2020).

These sources sit alongside those already cited in `entry-mode-models.js` (Anderson & Gatignon, 1986; Zhao et al., 2004; Wan et al., 2023; Zhang et al., 2022; Brouthers et al., 2022; Gong et al., 2024). The calibration notes flag where the current parameters need review. For example, joint ventures have knowledge protection 45, which is below export at 55, although the literature treats them as equity modes.

## Limitations

- The mode parameters and the Japan profile are illustrative teaching inputs. They are not country rankings or investment advice.
- Institutional and cultural distance are placeholders until a bilateral home–host module and expert validation are in place.
- A sensitivity analysis of the weights has not yet been done.
- Country data enter only through the provenance contract in `country-profile-registry.js`.

## Running the tests

```
npm test
```

## Citation

Please cite the version DOI shown on Zenodo; `CITATION.cff` holds the metadata. AIBIS is derived from the BizOn ecosystem, https://github.com/thuyhuongctu/BizOn (DOI [10.5281/zenodo.21592241](https://doi.org/10.5281/zenodo.21592241)).

## References

- Aguilera, R. V., Crespí-Cladera, R., Infantes, P. M., & Pascual-Fuster, B. (2020). Business groups and internationalization: Effective identification and future agenda. *Journal of World Business, 55*, 101050. https://doi.org/10.1016/j.jwb.2019.101050
- Beugelsdijk, S., Kostova, T., Kunst, V. E., Spadafora, E., & van Essen, M. (2018). Cultural distance and firm internationalization: A meta-analytical review and theoretical implications. *Journal of Management, 44*(1), 89–130. https://doi.org/10.1177/0149206317729027
- Blomstermo, A., Sharma, D. D., & Sallis, J. (2006). Choice of foreign market entry mode in service firms. *International Marketing Review, 23*(2), 211–229. https://doi.org/10.1108/02651330610660092
- Elmoez, Z., Zorgati, I., & Alessa, A. A. (2021). Cultural distance and corporate internationalization: Evidence from emerging economies. *Journal of Asian Finance, Economics and Business, 8*(3), 267–275. https://doi.org/10.13106/jafeb.2021.vol8.no3.0267
- Hult, G. T. M., Gonzalez-Perez, M. A., & Lagerström, K. (2020). The theoretical evolution and use of the Uppsala Model of internationalization in the international business ecosystem. *Journal of International Business Studies, 51*(1), 38–49. https://doi.org/10.1057/s41267-019-00293-x
- Maekelburger, B., Schwens, C., & Kabst, R. (2012). Asset specificity and foreign market entry mode choice of small and medium-sized enterprises: The moderating influence of knowledge safeguards and institutional safeguards. *Journal of International Business Studies, 43*, 458–476. https://doi.org/10.1057/jibs.2012.12
- Ojala, A., & Tyrväinen, P. (2008). Market entry decisions of US small and medium-sized software firms. *Management Decision, 46*(2), 187–200. https://doi.org/10.1108/00251740810854113

## Licence

Proprietary; all rights reserved. See `LICENSE`. © 2026 Phan Anh Tu & Do Thuy Huong.
