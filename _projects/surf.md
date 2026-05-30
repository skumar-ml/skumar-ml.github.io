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
disclaimer: |
  Disclaimer: I initially one-shot generated the content on this project page with Cursor (provided my poster and paper PDFs). I then proceeded to <s>lightly</s> meaningfully manually edit the text.
teaser:
  image: "/assets/academic-project/images/CVPR_2026_SURF_Poster.png"
  caption: "CVPR 2026 poster — SURF measures whether concept-based explanations actually reflect a vision model's computation. <a href='/assets/academic-project/pdfs/surf-camera-ready.pdf' target='_blank'>PDF for full resolution</a>."
bibtex: |
  @inproceedings{kumar2026surf,
    title={Measuring the (Un)Faithfulness of Concept-Based Explanations},
    author={Kumar, Shubham and Ahuja, Narendra},
    booktitle={IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)},
    year={2026},
    url={https://arxiv.org/abs/2504.10833}
  }
---

## Positioning Concept-Based Explanations

There are many opinions on how to generate explanations for AI models. Some folks think we should be developing **Inherently interpretable models**, where the explanation is explicitly in the model architecture; however, these often sacrifice performance. For vision models, the initial popular method was **feature attribution methods** (e.g., saliency maps, SHAP), which highlight which input pixels matter, but they struggle with faithfulness evaluation and rarely convey *what* semantics the model recognizes. Then, **Concept-based explanation methods (CBEMs)** entered the scene. They explain predictions in terms of human-understandable concepts—edges, textures, object parts—and operate on the model's intermediate representations.

Initial CBEM approaches were **supervised** methods, requiring a pre-defined, annotated concept vocabulary (which is costly and may miss important aspects of the model's computation). So we developed **Unsupervised CBEMs (U-CBEMs)** that automatically discover concepts as directions in representation space, paired with importance scores. The most scalable version of this (which has gained recent popularity) are **sparse autoencoders (SAEs)**—originally developed for language model interpretability. U-CBEMs like ACE, CRAFT, C-SHAP, MCD, and SAEs all promise explanations that are both interpretable *and* faithful. This work asks: are they?

## The Problem of Measuring Faithfulness

For any explanation method, **faithfulness** asks whether the explanation actually reflects the model's internal computation. Naturally, we want explanations that are faithful; otherwise, they are useless and may even border on dangerous. Formally, an explanation is faithful if a **surrogate** $s$ that maps the explanation back to the model's output can reproduce the model's behavior:

$$
\text{Faith}(E;\, d,\, s) = \int_{\mathcal{X}} d\big(\phi(X),\, s(E(X))\big)\, dX
$$

Because explanations are lossy simplifications, some discrepancy is expected—but the choice of surrogate $s$ and metric $d$ matter enormously.

After reviewing the literature, we found that the challenge is twofold:

1. **Each U-CBEM proposes its own faithfulness measure**, with no measure-over-measure comparison, so the field lacks consensus on what "faithful" even means in practice.
2. **Reported faithfulness gains may be artifacts of the evaluation itself**—either hidden complexity in the surrogate (shifting the interpretability burden downstream) or flawed deletion-based proxies (we will discuss this in more detail later) borrowed from the feature attribution literature.

Without a principled measure, we cannot reliably compare methods or diagnose when a visually compelling explanation misrepresents the model. Before diving into our work, let's talk about what the heck a U-CBEM even is anyway.

## Components of an Unsupervised Concept-Based Explanation

*If you don't like math, skip to the picture below!*

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

## A Motivating Example

Consider a model that misclassifies a **helicopter** image as an **airplane**. A U-CBEM like CRAFT can produce concept-based explanations for *both* the correct class (helicopter) and the incorrect predicted class (airplane). Visually, both explanations may appear equally plausible—highlighting coherent concept patches and sensible importances.

Without a reliable faithfulness measure, a user has no principled way to determine which explanation (if either) reflects the model's actual computation. The explanation for the wrong class may look just as convincing as the one for the right class. This is precisely the failure mode SURF is designed to detect: **interpretability alone does not guarantee faithfulness**.

*Placeholder: helicopter misclassification example with side-by-side CRAFT explanations for the correct and predicted classes.*

## Limitations of Prior Faithfulness Metrics

We unify prior U-CBEM faithfulness measures under a common framework with two families:

### Deletion-based proxies

The idea is intuitive: if an explanation is faithful, then removing the concepts one by one should degrade the model's output. Deleting the most important concepts should degrade the model the most. The idea has been adapted into a metric (but since we don't feel like it actually measures faithfulness, we call them proxies); these proxies have been commonly used in prior works (ACE, MCD, HU-MCD, CDISCO, CRAFT). Each prior work introduces a sightly different variant on the metric---but they all share fundamental problems:

- **Ill-defined deletion:** What does it mean to delete a concept from a neural network? Can you really just set it to 0? *I like the example that gives in this video*. This is a hard problem to overcome.
- **Off-manifold inputs:** Deleting concepts (even if we can do them correctly) may result in inputs that the model has never seen before (very far from the data manifold). How can we know if model degradation is due to off-manifold inputs, or the model actually relying on the concept?

There's (at least two) unresolved questions for deletion-based proxies, and we are not very interested in solving them because there's a simpler way to do measure faithfulness (at least for U-CBEMs).

### Surrogate-based measures

A surrogate-based measure defines a *surrogate* that maps from the explanation to the model's output, and a *metric* to measure the error between the surrogate and the model's output. If a surrogate can accurately reconstruct the model's output from the explanation, then we can say that the explanation is faithful.

The idea is simple; however,surrogate-based measures must be defined carefully. Faithfulness can easily be *artificially* inflated by using an overly complex surrogate to "overfit" to the model's output. Critically, observe that the surrogate mathematically represents what a human (or end user) must *conceptually* do to mentally map from the explanation to the model's output. Human's tend to struggle finding non-linear relationships. Thus, we want to move towards surrogates that are as simple (for humans to conceptually) as possible. Otherwise, we risk inflating faithfulness artificially (which is one reason why prior approaches obtained both interpretable and faithful explanations). **Add a footnote here talking about how (in my mind) faithfulness and interpretability really are the two components of an explanation that ultimately determine it's usefulness. What I'm basically saying is that complex surrogates obscure the true faithfulness of the method, making it seem better on paper, but does not translate to practice.**

There's some other issues with prior surrogate-based measures. Take our word for it (or read the paper!). Enjoy this nice figure I spent way too much time on, and that none of my reviewers seemingly cared for.

*Placeholder: unified faithfulness framework diagram (Fig. 1 from paper).*

## SURF: Method and Assumptions

**Surrogate Faithfulness (SURF)** introduces a simple, linear surrogate inspired by the structure of the model's final linear layer. The model output for class $i$ decomposes as (up to the bias term):

$$
y_i = \sum_{j=1}^{HW} h_j^\top v_{i,j}\, \alpha_{i,j}, \quad \text{where } \|v_{i,j}\|_2 = 1,\; \alpha_{i,j} = \|f_{i,j}\|_2
$$

SURF's surrogate replaces the learned weights with the U-CBEM's discovered CAVs and importances:

$$
\hat{y}_i = s_i(\cdot) = \sum_{j=1}^{HW} \sum_{k=1}^{K} \alpha_{i,k}\, P(h_j;\, V_i)_k
$$

So basically, SURF is predicting the model's output as a sum of concept scores (i.e., how strongly is the concept present in the input), weighted by the concept importances (i.e., how much does the model care about this concept for this class).

**Metrics.** SURF measures error in both logit and probability space:

$$
\text{SURF}_{\text{MAE}} = \frac{1}{|V|\, C} \sum_{x \in V} \sum_{i=1}^{C} \big|y_i - \hat{y}_i\big|
$$

$$
\text{SURF}_{\text{EMD}} = \frac{1}{2|V|} \sum_{x \in V} \sum_{i=1}^{C} \big|p_i - \hat{p}_i\big|
$$

where $y$ denotes class logits, $p = \text{softmax}(y)$, and $V$ is the evaluation set.

**Assumption (and main limitation atm):**

In order to reflect the mental computation a human would need to perform to connect the explanation to the output, we force our surrogate to be **linear and have no trainable parameters**. Thus, the surrogate only really works for explanations on the **final linear layer** in models. In practice, this isn't really too bad of a limitation so most other work focuses on the same setting, but in the abstract, it's something that is undesirable. 

## Benchmark: Caltech-101 (ResNet-50)
*Our paper empirically validates that SURF is better (to no one's surprise) than past surrogate-based measures. Check it out if you're interested. This page focuses on the more interesting findings.*

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

**No evaluated U-CBEM is faithful.** Even the best method (SAE) has {% include inline-math.html latex="\text{SURF}_{\text{EMD}} = 0.195" %}—on average, ~20% of the surrogate's output distribution is incorrect. 

**Talk about why certain methods struggle**

## Parsimony vs. Faithfulness

The number of concepts $K$ is the most important hyperparameter for any U-CBEM. More concepts should yield more faithful explanations, but too many harm interpretability—humans can only hold a limited number of items in their working memory.

Prior works set $K$ arbitrarily (e.g., $K = 10$ for ICE, $K = 25$ for CRAFT), mainly because there isn't a good way for us to know how to set it. Now that we have a reliable faithfulness metric (SURF), we can actually analyze this tradeoff by measuring faithfulness as $K$ increases:

- **CDISCO, CRAFT, C-SHAP, ICE** barely improve—or worsen—as $K$ grows.
- **SAE** improves initially but then oscillates.
- **MCD and HU-MCD** uniformly improve and **plateau**, suggesting a natural choice for $K$ at the knee of the curve.

Interestingly, HU-MCD is more faithful than MCD only at low $K$; as concepts increase.

*Placeholder: faithfulness vs. number of concepts plots (EMD and MAE, Fig. 2 from paper).*

## Conclusion

Current U-CBEMs have been evaluated with fragmented, flawed faithfulness measures that create an illusion of progress. By organizing prior metrics under a unified framework, identifying their limitations, and proposing **SURF**—a simple linear surrogate with holistic logit- and probability-space metrics—we provide the first reliable benchmark of U-CBEM faithfulness.

Our key findings:

1. **Prior faithfulness measures fail basic sanity checks** that SURF passes.
2. **State-of-the-art U-CBEMs—including visually compelling methods—are not faithful** to the model's final-layer computation.
3. **SURF enables principled selection of the number of concepts**, balancing parsimony and faithfulness.

SURF measures faithfulness, not interpretability. We urge future work to report SURF scores alongside interpretability claims. Extending SURF to intermediate layers—where the relationship between explanation and output is non-linear—remains important future work.
