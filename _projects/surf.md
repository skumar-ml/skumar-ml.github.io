---
layout: project
title: "Measuring the (Un)Faithfulness of Concept-Based Explanations"
description: "We propose SURF, a principled faithfulness measure for unsupervised concept-based explanations, and show that many state-of-the-art methods are not as faithful as previously reported."
authors:
  - name: "Shubham Kumar"
    url: "https://skumar-ml.github.io/"
  - name: "Narendra Ahuja"
    url: "https://vision.ai.illinois.edu/narendra-ahuja/"
affiliation: "University of Illinois Urbana-Champaign"
venue: "CVPR 2026"
published_date: 2026-03-27
start_date: 2026-03-27
keywords:
  - explainable AI
  - concept-based explanations
  - faithfulness
  - sparse autoencoders
  - interpretability
links:
  - name: "Paper"
    type: paper
    url: "/assets/academic-project/pdfs/surf-camera-ready.pdf"
  - name: "arXiv"
    type: arxiv
    url: "https://arxiv.org/abs/2504.10833"
  - name: "Code"
    type: code
    url: "https://github.com/skumar-ml/surf-eval"
  - name: "Poster"
    type: supplementary
    url: "/assets/academic-project/images/CVPR_2026_SURF_Poster.png"
teaser:
  image: "/assets/academic-project/images/CVPR_2026_SURF_Poster.png"
  caption: "CVPR 2026 poster — SURF measures whether concept-based explanations actually reflect a vision model's computation."
abstract: |
  Deep vision models perform input-output computations that are hard to interpret. Concept-based explanation methods (CBEMs) increase interpretability by re-expressing parts of the model with human-understandable semantic units, or concepts. Checking if the derived explanations are faithful—that is, they represent the model's internal computation—requires a surrogate that combines concepts to compute the output. Simplifications made for interpretability inevitably reduce faithfulness, resulting in a tradeoff between the two. State-of-the-art unsupervised CBEMs (U-CBEMs) are seemingly more interpretable, while also being more faithful to the model. However, we observe that the reported improvement in faithfulness artificially results from either (1) using overly complex surrogates, which introduces an unmeasured cost to the explanation's interpretability, or (2) relying on deletion-based approaches that, as we demonstrate, do not properly measure faithfulness. We propose **Surrogate Faithfulness (SURF)**, which replaces prior complex surrogates with a simple, linear surrogate and introduces metrics that assess error across all output classes. SURF enables the first reliable faithfulness benchmark of U-CBEMs, revealing that many visually compelling U-CBEMs are not faithful.
bibtex: |
  @inproceedings{kumar2026surf,
    title={Measuring the (Un)Faithfulness of Concept-Based Explanations},
    author={Kumar, Shubham and Ahuja, Narendra},
    booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
    year={2026},
    url={https://arxiv.org/abs/2504.10833}
  }
---

## 1. Positioning Concept-Based Explanations

Explainable AI spans a spectrum of approaches. **Inherently interpretable models** bake structure into the network itself, but often sacrifice performance. **Feature attribution methods** (e.g., saliency maps, SHAP) highlight which input pixels matter, but struggle with faithfulness evaluation and rarely convey *what* semantics the model recognizes. **Concept-based explanation methods (CBEMs)** instead explain predictions in terms of human-understandable concepts—edges, textures, object parts—and operate on the model's intermediate representations, making surrogate-based faithfulness evaluation more natural.

Within CBEMs, **supervised** methods require a pre-defined, annotated concept vocabulary, which is costly and may miss important aspects of the model's computation. **Unsupervised CBEMs (U-CBEMs)** automatically discover concepts as directions in representation space, paired with importance scores. Recent work has applied **sparse autoencoders (SAEs)**—originally developed for language model interpretability—as a scalable U-CBEM for vision. Methods like ACE, CRAFT, C-SHAP, MCD, and SAEs all promise explanations that are both interpretable *and* faithful. We ask: are they?

## 2. The Problem of Measuring Faithfulness

For any explanation method, **faithfulness** asks whether the explanation actually reflects the model's internal computation. Formally, an explanation is faithful if a **surrogate** $s$ that maps the explanation back to the model's output reproduces the model's behavior:

$$
\text{Faith}(E;\, d,\, s) = \int_{\mathcal{X}} d\big(\phi(X),\, s(E(X))\big)\, dX
$$

Because explanations are lossy simplifications, some discrepancy is expected—but the choice of surrogate $s$ and metric $d$ matter enormously.

For post-hoc, concept-based explanations specifically, the challenge is twofold:

1. **Each U-CBEM proposes its own faithfulness measure**, with no measure-over-measure comparison, so the field lacks consensus on what "faithful" even means in practice.
2. **Reported faithfulness gains may be artifacts of the evaluation itself**—either hidden complexity in the surrogate (shifting the interpretability burden downstream) or flawed deletion-based proxies borrowed from the attribution literature.

Without a principled measure, we cannot reliably compare methods or diagnose when a visually compelling explanation misrepresents the model.

## 3. Components of an Unsupervised Concept-Based Explanation

A vision model $\phi = f \circ g$ maps an input $X$ to output $y$ through an intermediate embedding $h = g(X)$. For each output class $i$, a U-CBEM discovers **K concept activation vectors (CAVs)** and **concept importances**:

$$
V_i = \{v_{i,k}\}_{k=1}^{K}, \qquad A_i = \{\alpha_{i,k}\}_{k=1}^{K}
$$

along with a **concept projection** $P(h;\, V_i)$ that maps embeddings into concept space. The explanation is:

$$
E_i(X) = E_i(X;\, g,\, V_i,\, A_i,\, P) = \big\{P(g(X);\, V_i),\; A_i\big\}
$$

This is conveyed to the user through visualizations—concept heatmaps, example patches, importance bars. Faithfulness is evaluated by comparing the model output $f(h)$ to the surrogate output $\hat{y}$ obtained by passing the explanation through a surrogate $s$. On the final layer (where $H = W = 1$):

$$
\text{Faith}_{\text{U-CBEM}}(P,\, \{V_i\}_{i=1}^{C},\, \{A_i\}_{i=1}^{C};\, d,\, s) = \int_{\mathcal{H}} d\Big(f(h),\, \big\{s(P(h;\, V_i),\, A_i)\big\}_{i=1}^{C}\Big)\, dh
$$

*Placeholder: diagram of U-CBEM components (concept projection, CAVs, importances, surrogate).*

## 4. A Motivating Example

Consider a model that misclassifies a **helicopter** image as an **airplane**. A U-CBEM like CRAFT can produce concept-based explanations for *both* the correct class (helicopter) and the incorrect predicted class (airplane). Visually, both explanations may appear equally plausible—highlighting coherent concept patches and sensible importances.

Without a reliable faithfulness measure, a user has no principled way to determine which explanation (if either) reflects the model's actual computation. The explanation for the wrong class may look just as convincing as the one for the right class. This is precisely the failure mode SURF is designed to detect: **interpretability alone does not guarantee faithfulness**.

*Placeholder: helicopter misclassification example with side-by-side CRAFT explanations for the correct and predicted classes.*

## 5. Limitations of Prior Faithfulness Metrics

We unify prior U-CBEM faithfulness measures under a common framework with two families:

### Deletion-based proxies

These remove concepts (in image, weight, or concept space) in order of importance and measure model degradation. Prior works (ACE, MCD, HU-MCD, CDISCO, CRAFT) differ in deletion space, deletion method, and metric—but share fundamental problems:

- **Ill-defined deletion:** Setting a concept to zero does not guarantee it is fully removed without affecting other concepts.
- **Off-manifold inputs:** Perturbed representations may leave the data manifold, causing the model to behave unpredictably and producing misleading faithfulness signals.

We argue deletion-based proxies are unreliable and do not benchmark against them.

### Surrogate-based measures

Prior surrogates from ICE-Eval and C-SHAP-Eval fail three key **desiderata**:

| Property | ICE-Eval | C-SHAP-Eval | SURF (Ours) |
|----------|:--------:|:-----------:|:-----------:|
| Simple (no reconstruction, no extra parameters) | ✗ | ✗ | ✓ |
| Uses concept importances | ✗ | ✗ | ✓ |
| Errors on all outputs | ✗ | ✗ | ✓ |

ICE-Eval and C-SHAP-Eval reconstruct embeddings (often non-linearly), ignore concept importances $A_i$, and measure error only on the predicted or ground-truth class—missing errors across the full output distribution.

*Placeholder: unified faithfulness framework diagram (Fig. 1 from paper).*

## 6. SURF: Method and Assumptions

**Surrogate Faithfulness (SURF)** introduces a simple, linear surrogate inspired by the structure of the model's final linear layer. The model output for class $i$ decomposes as (up to the bias term):

$$
y_i = \sum_{j=1}^{HW} h_j^\top v_{i,j}\, \alpha_{i,j}, \quad \text{where } \|v_{i,j}\|_2 = 1,\; \alpha_{i,j} = \|f_{i,j}\|_2
$$

SURF's surrogate replaces the learned weights with the U-CBEM's discovered CAVs and importances:

$$
\hat{y}_i = s_i(\cdot) = \sum_{j=1}^{HW} \sum_{k=1}^{K} \alpha_{i,k}\, P(h_j;\, V_i)_k
$$

**Metrics.** SURF measures error in both logit and probability space:

$$
\text{SURF}_{\text{MAE}} = \frac{1}{|V|\, C} \sum_{x \in V} \sum_{i=1}^{C} \big|y_i - \hat{y}_i\big|
$$

$$
\text{SURF}_{\text{EMD}} = \frac{1}{2|V|} \sum_{x \in V} \sum_{i=1}^{C} \big|p_i - \hat{p}_i\big|
$$

where $y$ denotes class logits, $p = \text{softmax}(y)$, and $V$ is the evaluation set.

**Assumptions:**

1. Faithfulness is evaluated on the **final linear layer** (following prior U-CBEM work), where $H = W = 1$ after global pooling.
2. The surrogate is **linear and has no trainable parameters**—it reflects the mental computation a human would perform to connect concepts to predictions.
3. Both CAVs $V_i$ and importances $A_i$ are used; inaccuracies in either affect the score.
4. Errors are measured **holistically across all output classes**, not just the predicted class.

*Placeholder: SURF surrogate diagram showing parallel paths from embedding to model output vs. surrogate output.*

## 7. Measure-over-Measure Results

Because there is no ground-truth faithfulness, we propose a **sanity check** with three manufactured settings where relative faithfulness is known:

| Setting | Description |
|---------|-------------|
| **Perfect** | CAVs and importances copied from the model's own final layer |
| **Rand Imp** | Perfect CAVs, random importances |
| **Full Rand** | Random CAVs and random importances |

We expect perfect faithfulness in the Perfect setting, with monotonically worse scores as randomness increases. Evaluated on ImageNet-pretrained ResNet-50 finetuned on Caltech-101:

| Measure | Perfect | Rand Imp | Full Rand |
|---------|:-------:|:--------:|:---------:|
| **SURF (Ours)** | ✓ passes | ✓ degrades | ✓ degrades |
| ICE-Eval | ✓ perfect | ✗ unchanged | ✓ degrades |
| C-SHAP-Eval | ✗ imperfect | ✗ unchanged | ✗ *improves* |

Only SURF passes the sanity check while using the simplest surrogate (0 learned parameters, ~200 FLOPs vs. ~205M for C-SHAP-Eval). Prior metrics also fail on individual metrics—e.g., Top-1 accuracy stays high in the Rand Imp setting even when {% include inline-math.html latex="\text{SURF}_{\text{EMD}}" %} reveals severe errors on non-predicted classes.

*Placeholder: measure-over-measure comparison table/plot (Tab. 3 from paper).*

## 8. Benchmark: Caltech-101 (ResNet-50)

We apply SURF to seven U-CBEMs on object classification with a Caltech-101 finetuned ResNet-50 (~95.6% test accuracy). Each method discovers $K = 5$ concepts per output class:

| U-CBEM | SURF-MAE ↓ | SURF-EMD ↓ | Top-1 (%) ↑ | Rank Corr ↑ |
|--------|:----------:|:----------:|:-----------:|:-----------:|
| CDISCO | 3.40 | 0.932 | 0.2 | 0.002 |
| ICE | 3.33 | 0.628 | 98.9 | 0.093 |
| CRAFT | 3.19 | 0.878 | 90.6 | 0.068 |
| C-SHAP | 3.28 | 0.882 | 6.3 | 0.005 |
| MCD | 2.60 | 0.426 | 99.4 | 0.145 |
| HU-MCD | 1.97 | 0.384 | 99.7 | 0.149 |
| **SAE** | **1.04** | **0.195** | 99.2 | 0.366 |

**No evaluated U-CBEM is faithful.** Even the best method (SAE) has {% include inline-math.html latex="\text{SURF}_{\text{EMD}} = 0.195" %}—on average, ~20% of the surrogate's output distribution is incorrect. High Top-1 accuracy (e.g., 99.7% for HU-MCD) masks large errors on non-predicted classes, illustrating why holistic metrics matter.

*Placeholder: benchmark bar chart comparing SURF metrics across U-CBEMs.*

## 9. Parsimony vs. Faithfulness

The number of concepts $K$ is the most important hyperparameter for any U-CBEM. More concepts should yield more faithful explanations, but too many harm interpretability—humans can hold only a limited number of items in working memory.

Prior works set $K$ arbitrarily (e.g., $K = 10$ for ICE, $K = 25$ for CRAFT). SURF enables principled analysis of this tradeoff by measuring faithfulness as $K$ increases:

- **CDISCO, CRAFT, C-SHAP, ICE** barely improve—or worsen—as $K$ grows.
- **SAE** improves initially but then oscillates.
- **MCD and HU-MCD** uniformly improve and **plateau**, suggesting a natural choice for $K$ at the knee of the curve.

Interestingly, HU-MCD is more faithful than MCD only at low $K$; as concepts increase, MCD overtakes it—contradicting prior claims based on deletion-based proxies.

*Placeholder: faithfulness vs. number of concepts plots (EMD and MAE, Fig. 2 from paper).*

## 10. Conclusion

Current U-CBEMs have been evaluated with fragmented, flawed faithfulness measures that create an illusion of progress. By organizing prior metrics under a unified framework, identifying their limitations, and proposing **SURF**—a simple linear surrogate with holistic logit- and probability-space metrics—we provide the first reliable benchmark of U-CBEM faithfulness.

Our key findings:

1. **Prior faithfulness measures fail basic sanity checks** that SURF passes.
2. **State-of-the-art U-CBEMs—including visually compelling methods—are not faithful** to the model's final-layer computation.
3. **SURF enables principled selection of the number of concepts**, balancing parsimony and faithfulness.

SURF measures faithfulness, not interpretability. We urge future work to report SURF scores alongside interpretability claims. Extending SURF to intermediate layers—where the relationship between explanation and output is non-linear—remains important future work.

## Poster

[![CVPR 2026 SURF Poster](/assets/academic-project/images/CVPR_2026_SURF_Poster.png)](/assets/academic-project/images/CVPR_2026_SURF_Poster.png)

Full-resolution poster for CVPR 2026. [Download PDF](/assets/academic-project/pdfs/surf-camera-ready.pdf).
