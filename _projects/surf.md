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

## Intro
We do not know how an AI model gets to a certain prediction. Take an image classifier as an example. If we show it a picture of a helicopter, there's probably a 99% chance it classifies it as an airplane correctly. But there's a 1% chance it fails, and we do not when it will happen apriori (i.e., before actually running the model). But why? What is it that makes it think it's an airplane?

This motivates explainable AI (XAI), aka interpreability, mechanistic intepretability, etc, etc. There are many opinions on how to generate explanations for AI models. One of the most promising approaches is to try to find out the **concepts** that the model internally recognizes as it makes it's predictions. This is particularly useful for vision models, since we can understand the airplane classification in terms of if the fuselage, wings, windows, and tires were detected, rather than looking at pixels. These class of XAI methods are called **concept-based explanation methods (CBEMs)**. Nowadays, we find concepts in an unsupervised manner, so these are called **unsupervised CBEMs (U-CBEMs)**.

If you're interested in a brief overview of the XAI literature and where U-CBEMs fit, open the dropdown:

<!-- For a full There are many opinions on how to generate explanations for AI models. Some folks think we should be developing **Inherently interpretable models**, where the explanation is explicitly in the model architecture; however, these often sacrifice performance. For vision models, the initial popular method was **feature attribution methods** (e.g., saliency maps, SHAP), which highlight which input pixels matter, but they struggle with faithfulness evaluation and rarely convey *what* semantics the model recognizes. Then, **Concept-based explanation methods (CBEMs)** entered the scene. They explain predictions in terms of human-understandable concepts—edges, textures, object parts—and operate on the model's intermediate representations.

Initial CBEM approaches were **supervised** methods, requiring a pre-defined, annotated concept vocabulary (which is costly and may miss important aspects of the model's computation). So we developed **Unsupervised CBEMs (U-CBEMs)** that automatically discover concepts as directions in representation space, paired with importance scores. The most scalable version of this (which has gained recent popularity) are **sparse autoencoders (SAEs)**—originally developed for language model interpretability. U-CBEMs like ACE, CRAFT, C-SHAP, MCD, and SAEs all promise explanations that are both interpretable *and* faithful. This work asks: are they?-->

Naturally, we want explanations that are both interpretable (i.e., helpful to humans) and faithful (i.e., reflect the model's internal computation). However, there's a tradeoff between the two: more complex explanations are more faithful, but less interpretable (and vice versa). As newer U-CBEM methods are developed, they promise to be more interpretable (i.e., helpful to humans) **and** faithful (i.e., reflect the model's internal computation). This work asks: are they?


## The Problem of Measuring Faithfulness

For any explanation method, **faithfulness** asks whether the explanation actually reflects the model's internal computation. Naturally, we want explanations that are faithful; otherwise, they are useless and may even border on dangerous. Formally, an explanation $E$ is faithful if a **surrogate** $s$ can accurately reconstruct the model $\phi$'s output (for every input $X$) from the explanation:

$$
\text{Faith}(E;\, d,\, s) = \int_{\mathcal{X}} d\big(\phi(X),\, s(E(X))\big)\, dX
$$

Because explanations are lossy simplifications of the model's internal computation, some discrepancy is expected—but the choice of surrogate $s$ and metric $d$ matter enormously. After reviewing the literature, we found that the challenge with faithfulness evaluation is twofold:

1. **Each U-CBEM proposes its own faithfulness measure**, with no measure-over-measure comparison, so the field lacks consensus on what "faithful" even means in practice.
2. **Reported faithfulness gains may be artifacts of the evaluation itself**—either hidden complexity in the surrogate (shifting the interpretability burden downstream) or flawed deletion-based proxies (we will discuss this in more detail later) borrowed from the feature attribution literature.

Without a principled measure, we cannot reliably compare methods or diagnose when a visually compelling explanation misrepresents the model. Before diving into our work, let's talk about what the heck a U-CBEM even is anyway.

## Components of an Unsupervised Concept-Based Explanation

Check out this video example of a U-CBEM:
<!-- insert video here -->
A U-CBEM finds concepts (or *concept activation vectors (CAVs)*) by analyzing intermediate representations in the model (i.e., like looking for patterns). After finding a set of concepts, the U-CBEM can determine how *much* of the concept any input image contains (*local concept importance*). Finally, the U-CBEM also characterizes how important the concept is for a given class (*global concept importance*). All of this information can be visualized in a compact image.

See the paper for a formal definition of U-CBEMs.

## A Motivating Example

Given the following explanation, what did the model predict? 

<!-- create the demo here -->

Consider a model that misclassifies a **helicopter** image as an **airplane**. Using a U-CBEM like CRAFT, we can produce explanations for the correct class (helicopter) and the incorrect predicted class (airplane). Visually, both explanations appear equally plausible—highlighting coherent concept patches and sensible importances. This is because CRAFT is *unfaithful* in this setting. Only the class the model predicts (Airplane) should appear plausible from the explanation. This precisely motivates SURF: **interpretability alone does not guarantee faithfulness**.

*Placeholder: helicopter misclassification example with side-by-side CRAFT explanations for the correct and predicted classes.*

## Limitations of Prior Faithfulness Metrics

There are two families of faithfulness metrics for U-CBEMs.

### Deletion-based proxies

The idea is intuitive: if an explanation is faithful, then removing the concepts one by one should degrade the model's output. Deleting the most important concepts should degrade the model the most. The idea has been adapted into a metric (but since we don't feel like it actually measures faithfulness, we call them proxies); these proxies have been commonly used in prior works (ACE, MCD, HU-MCD, CDISCO, CRAFT). Each prior work introduces a sightly different variant on the metric---but they all share fundamental problems:

- **Ill-defined deletion:** What does it mean to delete a concept from a neural network? Can you really just set it to 0? *I like the example that gives in this video*. This is a hard problem to overcome.
- **Off-manifold inputs:** Deleting concepts (even if we can do them correctly) may result in inputs that the model has never seen before (very far from the data manifold). How can we know if model degradation is due to off-manifold inputs, or the model actually relying on the concept?

There's (at least two) unresolved questions for deletion-based proxies, and we are not very interested in solving them because there's a simpler way to do measure faithfulness (at least for U-CBEMs).

### Surrogate-based measures

A surrogate-based measure defines a *surrogate* that maps from the explanation to the model's output, and a *metric* to measure the error between the surrogate and the model's output. If a surrogate can accurately reconstruct the model's output from the explanation, then we can say that the explanation is faithful.

The idea is simple; however, surrogate-based measures must be defined carefully. Faithfulness can easily be *artificially* inflated by using an overly complex surrogate to "overfit" to the model's output. Critically, observe that the surrogate mathematically represents what a human (or end user) must *conceptually* do to mentally map from the explanation to the model's output. Human's tend to struggle finding non-linear relationships. Thus, we want to move towards surrogates that are as simple (for humans to conceptually) as possible. Otherwise, we risk inflating faithfulness artificially (which is one reason why prior approaches obtained both interpretable and faithful explanations). <!-- Add a footnote here talking about how (in my mind) faithfulness and interpretability really are the two components of an explanation that ultimately determine it's usefulness. What I'm basically saying is that complex surrogates obscure the true faithfulness of the method, making it seem better on paper, but does not translate to practice. -->

There's some other issues with prior surrogate-based measures. Take our word for it (or read the paper!). Also, enjoy this nice figure comparing the two that I spent way too much time on, and that none of my reviewers seemingly cared for.

<!-- *Placeholder: unified faithfulness framework diagram (Fig. 1 from paper).* -->

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

**No evaluated U-CBEM is faithful.** Even the best method (SAE) has {% include inline-math.html latex="\text{SURF}_{\text{EMD}} = 0.195" %}—on average, ~20% of the surrogate's output distribution is incorrect. In the paper <!-- add section here -->, we speculate as to why certain methods struggle.

## Parsimony vs. Faithfulness

The number of concepts $K$ in the explanation is the most important hyperparameter for any U-CBEM. More concepts should yield more faithful explanations, but explanations with too many concepts are hard to interpret.

Prior works set $K$ arbitrarily (e.g., $K = 10$ for ICE, $K = 25$ for CRAFT), mainly because there isn't a good way for us to know how to set it. Now that we have a reliable faithfulness metric (SURF), we can actually analyze this tradeoff by measuring faithfulness as $K$ increases:

- **CDISCO, CRAFT, C-SHAP, ICE** barely improve—or worsen—as $K$ grows.
- **SAE** improves initially but then oscillates.
- **MCD and HU-MCD** uniformly improve and **plateau**, suggesting a natural choice for $K$ at the knee of the curve.

*Placeholder: faithfulness vs. number of concepts plots (EMD and MAE, Fig. 2 from paper).*

## Conclusion

SURF helps us reliably measure faithfulness for U-CBEMs applied in the last layer of a vision model. Even in this setting, we see many recent U-CBEMs have high faithfulness errors, despite the simple setting. We encourage future works to avoid deletion-based proxies and use SURF (or SURF-inspired) metrics to measure faithfulness. 

Some interesting future directions include:
- Extending SURF to intermediate layers—where the relationship between explanation and output is non-linear
- Designing more faithful U-CBEMs and, with human studies, studying how increased faithfulness translates to a more useful explanation.
