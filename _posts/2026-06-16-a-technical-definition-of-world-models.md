---
layout: post
title: "We Need a Technical Definition for World Models"
description: "Many AI researchers are building world models, and while we conceptual understand what a world model is, I feel that we lack a technical definition of one. This post gives one."
date: 2026-06-27 12:00:00 -0500
categories: blog
toc: true
disclaimer: |
  **Disclaimer:** AI was used to find references and proofread. The content was 100% written by me.
---

<div class="post-epigraph">
  <p class="post-epigraph-text">&ldquo;You see, but you do not observe. The distinction is clear.&rdquo;</p>
  <p class="post-epigraph-cite">&mdash; Sherlock Holmes to Dr. Watson, <em>A Scandal in Bohemia</em></p>
</div>

Fads in AI come and go nearly as fast as (or arguably, faster than) fashion trends. CNNs, RNNs, transformers, diffusion, agents, and now world models. It feels like many papers I read lately slyly slip “world models” somewhere, and during my time at IBM this summer, I’ve had the good fortune of studying world models. **My conclusion: most people are not actually building world models.** 

This may be partly attributed to the loose definition of world models. It's a loaded term that sounds flashy but currently lacks a *technical* definition (mainly because no one yet knows how to build one). All definitions for world models I have come across (both from classical thinkers and modern researchers) are high-level and conceptual{% include academic-project/footnote.html text="If you've come across other technical definitions, please let me know!" %}. They help frame what a world model is and why they are helpful, but they do not explain what a world model technically does.

**This post seeks to technically define world models by listing the capabilities they should have (I believe there are three).** Then, I examine popular approaches to world models (LeCun’s JEPA, Fei-Fei’s World Labs, Jim Fan’s World Action Models) and show that they are, according to my definition, not world models. I end with some forward-looking thoughts on where I think this all converges.

## So what is a world model anyway?

A world model, by the most generic definition possible, is an "internal model of how the world works" ([LeCun](https://openreview.net/pdf?id=BZ5a1r-kVsf)). It tells an agent what is (or what was/what would be) likely, plausible, and impossible ([LeCun](https://openreview.net/pdf?id=BZ5a1r-kVsf)).

Let's take a look at a real-life example. Recently I went to grab my lunch from a shared fridge. Upon opening the fridge, I realized that my lunch was not on the bottom row where I had originally placed it. What happened to it? My internal world model told me that either (A) someone stole it or (B) someone moved it. My world model judged (A) as unlikely, since I was in an IBM office (not some college dorm), but not impossible. To reduce the uncertainty, my internal *policy* directed me to gather more *observations* by looking elsewhere in the fridge, which led me to locate my lunch on the top shelf. Thus, my *belief* collapsed to (B). Note that my world model didn't think of other explanations, such as (C) a deer entered the office, found the fridge, and ate my lunch. Strictly plausible, but highly unlikely{% include academic-project/footnote.html text="And if that had indeed occurred, my world model would probably be seriously updated." %}.

<figure class="post-figure">
  <img src="/assets/images/lunch-world-model.png" alt="Three bar charts showing belief over lunch location: first certain on the fridge bottom, then uncertain between fridge top and gone, then certain on the fridge top.">
  <figcaption>How my belief over lunch location evolved using my world model: initially certain it was on the bottom shelf, uncertain when it was missing (probably somewhere else in the fridge, but maybe it was stolen), then certain again after I checked elsewhere in the fridge.</figcaption>
</figure>

## A technical definition of world models

Some terminology first. An *observation* is something that is seen by the agent. For embodied agents (e.g., robots and humans), this is sensory information (e.g., from eyes and ears). An *abstract state* is a higher-level, compact, and structured representation that is extracted from the observations. It is the useful information our world model operates on. For example, if one is driving, the abstract state could include location of pedestrians, other cars, speed limit, weather, etc. All of these are *inferrable* from our observations, but they are *not* the same as our observations.

Technically speaking, any system that meets the following criteria is a world model:

- **Goal #1.** Extract an abstract state from observations.
- **Goal #2.** Update the abstract state based on new observations.
- **Goal #3.** Predict the next abstract state, given the current state and an action.

There are bonus desiderata that would make a world model more useful, but I don't believe they should be part of the definition{% include academic-project/footnote.html text="Having a semantic abstract state is beneficial, since one can interpret the abstract state. It also allows for policies to interface with a world model through natural language. Relatedly, having a reasoning interface can allow for question-answering about the abstract state, rather than using the world model only as a simulator." %}.

The world model is *not* responsible for:
1. Planning actions.
2. Rendering a simulation of partial observations from the predicted next state.

This directly contradicts [Fei-Fei's definition of a world model](https://drfeifei.substack.com/p/a-functional-taxonomy-of-world-models). I think that what she calls a world model is really an amalgamation of a planner, renderer, and world model. At the end of the day, it's possible that all three of these components get folded into one end-to-end model, but it is not correct to *solely* call such a model a world model (instead, such a model includes a world model). 

## LeCun's JEPA-based World Models
LeCun has been building world models using the JEPA framework. Put simply, JEPA is a self-supervised way of training a backbone to accomplish Goal #1: given partial observations, a *state extractor* learns to represent the abstract state as a latent embedding. Then, an *action-conditioned next-state predictor* can be learned on top of the state extractor to accomplish Goal #3. Since LeCun's components are modular, the state extractor and action-conditioned next-state predictor can be trained separately (see [V-JEPA](https://arxiv.org/pdf/2603.14482)) or together in an end-to-end fashion (see [LeWorldModel](https://arxiv.org/pdf/2603.19312)).

The major limitation of LeCun's approach thus far is Goal #2. My personal opinion is that a more structured, latent *variable*{% include academic-project/footnote.html text="Something that represents distributions over abstract state, rather than the point estimate of an embedding." %} representation is needed to effectively reach this goal. From what I can tell, this seems to be something his group is actively working towards (see [C-JEPA](https://arxiv.org/pdf/2602.11389)).

<figure class="post-figure post-figure--triptych">
  <div class="post-figure-panels">
    <div class="post-figure-panel post-figure-panel--primary">
      <p class="post-figure-panel-label">LeCun (JEPA)</p>
      <img src="/assets/images/LeCun.png" alt="Diagram of LeCun's JEPA approach: an observation is encoded into an abstract state, which together with an action predicts the next abstract state.">
    </div>
    <div class="post-figure-panel-stack">
      <div class="post-figure-panel">
        <p class="post-figure-panel-label">Fei-Fei (World Labs)</p>
        <img src="/assets/images/FeiFei.png" alt="Diagram of Fei-Fei's World Labs approach: an observation is mapped to an interactive, editable 3D world.">
      </div>
      <div class="post-figure-panel">
        <p class="post-figure-panel-label">Jim Fan (WAM)</p>
        <img src="/assets/images/JimFan.png" alt="Diagram of Jim Fan's World Action Model: given an observation and past action, the model predicts the next action and next observation.">
      </div>
    </div>
  </div>
  <figcaption>A schematic comparison of three prominent &ldquo;world model&rdquo; approaches. LeCun&rsquo;s JEPA extracts abstract state and predicts the next abstract state; Fei-Fei&rsquo;s World Labs outputs an interactive 3D world; Jim Fan&rsquo;s WAM jointly predicts actions and next observations.</figcaption>
</figure>

## Fei-Fei's World Models
It's well known in the AI world that Fei-Fei (a legend for young computer vision researchers such as myself) has started [World Labs](https://www.worldlabs.ai/), and they are trying to build a world model for spatial intelligence. However, I don't think they are actually building a world model. 

In my view, they are really building a *3D simulation environment*{% include academic-project/footnote.html text="Which is useful and non-trivial, but separate from a world model." %}. The 3D environment is essentially richer observed data, but it is *not* an abstract state{% include academic-project/footnote.html text="One could argue against this by redefining what abstract state means." %}. Given a living room, the abstract state would contain things like: the mug is dirty, the TV is on, the cat is on the couch. The 3D model certainly contains this information in its rendering, but one would still need an abstract state extractor. Perhaps World Labs's argument is that accomplishing Goals #1–3 is much easier when you can learn a 3D simulator, because geometrical and physical constraints are enforced. Maybe that's true, but it doesn't mean they are building a world model.

Effectively, I'd argue that they are building a next-observable-state simulator, and on top of that representation, one would still need to accomplish Goals #1–3, which I don't believe is trivial.

<figure class="post-figure">
  <img src="/assets/images/world-labs-webp.webp" alt="Demo of World Labs generating an interactive, editable 3D environment.">
  <figcaption>A demo from the <a href="https://www.worldlabs.ai/" target="_blank" rel="noopener noreferrer">World Labs</a> homepage, showing a generated 3D world.</figcaption>
</figure>

## Jim Fan's WAM
Jim Fan's—and by extension NVIDIA's—[thesis](https://www.linkedin.com/pulse/second-pre-training-paradigm-jim-fan-xn5fc/) is that we can directly learn the policy and fold the world model into the learned policy. They are pushing World Action Models (WAMs). WAMs start with a pre-trained video-generation backbone, and train to predict future states (the state is represented by video frames) and robot actions when conditioned on past video frames, language instructions, and action sequences. Then, once the WAM is trained, it can run as a feedforward policy at inference time (the predicted image frames are typically discarded when using the WAM as a policy).

I think this approach is not world modeling for reasons similar to Fei-Fei's approach. Video frames are *not* an abstract state. But Jim is probably betting that a policy doesn't need an explicit world model{% include academic-project/footnote.html text="I would pay to watch LeCun and Jim duke this out." %}.

## So where does that leave us?

By my definition, none of the "big three" are building world models. They are building models that are likely helpful for robotics, but I don't see how other domains (e.g., IT, biology, meteorlogy) can leverage these approaches for builiding their own world models. 


LeCun is the closest of them all to my definition, but it remains to be seen if a true, decoupled world model is actually useful for robotics. It's true that humans have a world model, and many policy failures can be attributed to a lack of a world model. However, it's probably fair to say that the human world model is part of an "end-to-end model", and not some modular piece in our brain. Certainly, there is some evidence that world modeling principles are useful training objectives for models (see Meta's [Code World Models](https://arxiv.org/pdf/2510.02387), [this work](https://arxiv.org/abs/2511.05963) combining world modeling with autoregressive language generation, and [Reinforcement World Model Learning](https://arxiv.org/pdf/2602.05842) as examples).

If I had to guess, domains that are more easily RL'ed or that can collect enough expert demonstrations can probably learn implicit world models. Other domains will need to learn explicit world models. Explicit world models will help policies generalize to novel scenarios, whereas implicit world models will be easier to train and integrate with policies{% include academic-project/footnote.html text="In gradient descent we trust!" %}. Regardless, I'm excited to see where we go from here.