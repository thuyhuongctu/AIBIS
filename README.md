<div align="center">

# AIBIS Global Market Engine

**A deterministic engine for choosing international market-entry modes, built for teaching international business**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23317596.svg)](https://doi.org/10.5281/zenodo.23317596)
[![Latest version DOI](https://img.shields.io/badge/version%20DOI-10.5281%2Fzenodo.23317909-1682D4)](https://doi.org/10.5281/zenodo.23317909)
[![Tests](https://github.com/thuyhuongctu/AIBIS/actions/workflows/ci.yml/badge.svg)](https://github.com/thuyhuongctu/AIBIS/actions/workflows/ci.yml)
![Release](https://img.shields.io/badge/release-v0.1.1%20preview-orange)
![Node](https://img.shields.io/badge/node-%E2%89%A522-339933?logo=node.js&logoColor=white)
![Licence](https://img.shields.io/badge/licence-proprietary-lightgrey)

[**Live preview**](https://thuyhuongctu.github.io/BizOn/aibis-entry-mode-preview.html) ·
[**BizOn workspace**](https://thuyhuongctu.github.io/BizOn/app/aibis.html) ·
[**Zenodo record**](https://doi.org/10.5281/zenodo.23317596) ·
[**Cite**](#citation)

</div>

> [!NOTE]
> **Preview release (v0.1.1).** The parameters are illustrative and the model has not yet been calibrated. AIBIS is a teaching instrument, not a source of country rankings or investment advice. See [Limitations](#limitations).

---

## Contents

- [Overview](#overview)
- [Key features](#key-features)
- [Model](#model)
- [Repository structure](#repository-structure)
- [Getting started](#getting-started)
- [Literature base](#literature-base)
- [Limitations](#limitations)
- [Citation](#citation)
- [Authors](#authors)
- [References](#references)
- [Licence](#licence)

## Overview

AIBIS (Tier 2B of the [BizOn ecosystem](https://github.com/thuyhuongctu/BizOn)) scores six international market-entry modes for a given firm profile and host-country profile:

| Mode | | Mode | | Mode | |
|---|---|---|---|---|---|
| Export | 📦 | Licensing | 📄 | Joint venture | 🤝 |
| Strategic alliance | 🔗 | Wholly-owned FDI | 🏭 | Digital entry | 🌐 |

Each mode is evaluated on **eight priority dimensions** with published weights — *control, speed, learning, capital efficiency, risk compatibility, knowledge protection, local embeddedness* and *digital scalability* — and is then adjusted for firm-capability fit, host-country fit and cultural–institutional distance.

Because the engine is deterministic, identical inputs always yield an identical ranking. Learners can therefore trace why one mode outranks another, and instructors can assess the reasoning rather than the outcome alone.

## Key features

- **Transparent scoring.** Every weight and mode parameter is published in the source code; no hidden or stochastic components.
- **Literature-anchored parameters.** Each mode, parameter and country term is linked to verified sources, with explicit calibration notes (`js/aibis/literature.js`).
- **Provenance-aware country data.** An indicator enters the engine only if it carries its source, URL, reference year, licence and confidence level.
- **Reproducible classroom rounds.** Home/host role views, mid-game role swaps and frozen, hashed snapshots allow any decision to be re-scored exactly.
- **Separation of fit and evidence.** The fit score and the `evidenceConfidence` of each parameter are reported separately.
- **Contract-tested.** A dependency-free test suite runs on every push via GitHub Actions.

## Model

For mode *m*, firm *f* and host country *c*, the composite score is

$$S_m = 0.55\,P_m + 0.20\,K_{m,f} + 0.20\,C_{m,c} + 0.05\,(100 - D_c)$$

| Term | Weight | Meaning |
|---|:---:|---|
| $P_m$ | 0.55 | Weighted fit between the mode's attributes and the learner's priorities |
| $K_{m,f}$ | 0.20 | Fit between the mode's capability thresholds and the firm's financial capacity, international experience and digital capability |
| $C_{m,c}$ | 0.20 | Mode-specific host-country fit |
| $D_c$ | 0.05 | Mean of the institutional and cultural distance indices |

The distance term is identical across modes. This is consistent with meta-analytic evidence that cultural distance does not shift the joint-venture versus wholly-owned choice (Beugelsdijk et al., 2018).

## Repository structure

```text
AIBIS/
├── js/
│   ├── aibis/
│   │   ├── entry-mode-engine.js        # Scoring engine v0.1.0: scoreMode, rankModes, compareModes
│   │   ├── entry-mode-models.js        # Six modes, parameters, theoretical bases, evidenceConfidence
│   │   ├── literature.js               # Literature base: seven verified sources with calibration notes
│   │   ├── country-profile-*.js        # Country-data contract (schema 1.0) with provenance rules
│   │   ├── country-role-view.js        # Home/host role view
│   │   ├── round-swap.js               # Mid-game role swap
│   │   ├── anchor-profiles.js          # Frozen, hashed snapshots for reproducible scoring
│   │   └── entry-mode-preview*.js      # Simplified illustrative score used by the preview page
│   └── decision-log.js                 # Decision-log schema shared with BizOn (vendored)
├── docs/                               # Architecture note and country-data roadmap
├── test/                               # Contract tests
├── index.html                          # Preview page
├── CITATION.cff                        # Citation metadata
└── .zenodo.json                        # Zenodo archiving metadata
```

> [!IMPORTANT]
> The **preview page** uses its own simplified illustrative score (`entry-mode-preview.js`, `entry-mode-preview-data.js`) and does **not** call the engine. The full engine runs in the [AIBIS workspace of BizOn](https://thuyhuongctu.github.io/BizOn/app/aibis.html), which remains in BizOn because it depends on BizOn's shared app shell and instructor gradebook.

## Getting started

Requirements: [Node.js](https://nodejs.org/) 22 or later. There are no runtime dependencies.

```bash
git clone https://github.com/thuyhuongctu/AIBIS.git
cd AIBIS
npm test
```

To view the preview page locally, open `index.html` in a browser or serve the folder with any static server, for example `npx serve .`.

## Literature base

`js/aibis/literature.js` records, for each source, the research design, the finding as stated in the paper, the engine elements it informs and a calibration note. Every source was checked against the original article.

| Stream | Key insight for the engine | Sources |
|---|---|---|
| **Transaction cost economics** | Asset specificity pushes SMEs towards equity modes; knowledge and institutional safeguards weaken this effect. Soft-service firms prefer high-control modes. | Maekelburger et al. (2012); Blomstermo et al. (2006) |
| **Distance** | Cultural distance lowers the likelihood of entry and favours greenfield investment, but does not decide between JV and wholly-owned entry. A single-host study of Saudi Arabia finds the opposite, illustrating context dependence. | Beugelsdijk et al. (2018); Elmoez et al. (2021) |
| **Process and location** | Commitment grows gradually with experiential knowledge; market size is the main location driver for software SMEs. | Hult et al. (2020); Ojala & Tyrväinen (2008) |
| **Institutions and business groups** | Business-group-affiliated local partners matter where foreign ownership is restricted. | Aguilera et al. (2020) |

These sources complement those already cited in `entry-mode-models.js` (Anderson & Gatignon, 1986; Zhao et al., 2004; Wan et al., 2023; Zhang et al., 2022; Brouthers et al., 2022; Gong et al., 2024). The calibration notes flag parameters that require review; for instance, joint ventures currently have a knowledge-protection value of 45, below export at 55, although the literature treats joint ventures as equity modes.

## Limitations

- The mode parameters and the Japan profile are illustrative teaching inputs. They are not country rankings or investment advice.
- Institutional and cultural distance are placeholders pending a bilateral home–host module and expert validation.
- A sensitivity analysis of the weights has not yet been conducted.
- Country data enter the engine only through the provenance contract in `country-profile-registry.js`.

## Citation

If you use AIBIS in teaching or research, please cite it. The software is archived on Zenodo:

| DOI | Scope |
|---|---|
| [10.5281/zenodo.23317596](https://doi.org/10.5281/zenodo.23317596) | **Concept DOI** — all versions; always resolves to the latest |
| [10.5281/zenodo.23317909](https://doi.org/10.5281/zenodo.23317909) | Latest version (Zenodo record v2, 12 October 2026) |
| [10.5281/zenodo.23317597](https://doi.org/10.5281/zenodo.23317597) | Version v0.1.1 (12 October 2026) |

**APA 7**

> Phan, A. T., & Do, T. H. (2026). *AIBIS Global Market Engine: A deterministic engine for choosing international market-entry modes* [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.23317909

**BibTeX**

```bibtex
@software{phan_do_2026_aibis,
  author    = {Phan, Anh Tu and Do, Thuy Huong},
  title     = {{AIBIS Global Market Engine: A deterministic engine for
               choosing international market-entry modes}},
  year      = {2026},
  publisher = {Zenodo},
  doi       = {10.5281/zenodo.23317909},
  url       = {https://doi.org/10.5281/zenodo.23317909}
}
```

Machine-readable metadata are provided in [`CITATION.cff`](CITATION.cff); GitHub's *Cite this repository* button uses this file. AIBIS is derived from the BizOn ecosystem, https://github.com/thuyhuongctu/BizOn (DOI [10.5281/zenodo.21592241](https://doi.org/10.5281/zenodo.21592241)).

## Authors

| Author | ORCID | Contact |
|---|---|---|
| **Phan Anh Tu** | [0000-0003-0667-3137](https://orcid.org/0000-0003-0667-3137) | patu@ctu.edu.vn |
| **Do Thuy Huong** | [0000-0002-7711-2487](https://orcid.org/0000-0002-7711-2487) | thuyhuongctu@gmail.com |

School of Economics, Can Tho University, Vietnam.

## References

- Aguilera, R. V., Crespí-Cladera, R., Infantes, P. M., & Pascual-Fuster, B. (2020). Business groups and internationalization: Effective identification and future agenda. *Journal of World Business, 55*, 101050. https://doi.org/10.1016/j.jwb.2019.101050
- Beugelsdijk, S., Kostova, T., Kunst, V. E., Spadafora, E., & van Essen, M. (2018). Cultural distance and firm internationalization: A meta-analytical review and theoretical implications. *Journal of Management, 44*(1), 89–130. https://doi.org/10.1177/0149206317729027
- Blomstermo, A., Sharma, D. D., & Sallis, J. (2006). Choice of foreign market entry mode in service firms. *International Marketing Review, 23*(2), 211–229. https://doi.org/10.1108/02651330610660092
- Elmoez, Z., Zorgati, I., & Alessa, A. A. (2021). Cultural distance and corporate internationalization: Evidence from emerging economies. *Journal of Asian Finance, Economics and Business, 8*(3), 267–275. https://doi.org/10.13106/jafeb.2021.vol8.no3.0267
- Hult, G. T. M., Gonzalez-Perez, M. A., & Lagerström, K. (2020). The theoretical evolution and use of the Uppsala Model of internationalization in the international business ecosystem. *Journal of International Business Studies, 51*(1), 38–49. https://doi.org/10.1057/s41267-019-00293-x
- Maekelburger, B., Schwens, C., & Kabst, R. (2012). Asset specificity and foreign market entry mode choice of small and medium-sized enterprises: The moderating influence of knowledge safeguards and institutional safeguards. *Journal of International Business Studies, 43*, 458–476. https://doi.org/10.1057/jibs.2012.12
- Ojala, A., & Tyrväinen, P. (2008). Market entry decisions of US small and medium-sized software firms. *Management Decision, 46*(2), 187–200. https://doi.org/10.1108/00251740810854113

## Licence

Proprietary; all rights reserved. See [`LICENSE`](LICENSE). The Zenodo deposit is archived for transparency and citation; access to the files is restricted.

© 2026 Phan Anh Tu & Do Thuy Huong.
