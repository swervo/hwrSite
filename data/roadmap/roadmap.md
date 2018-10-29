# Development plan

## Version 1, November 2014

Version 1 covers initial prototyping through to initial release to
zLauncher, our lead customer project.  The focus of version 1 is
* alphanumeric recognition with Latin characters
* at least ``good'' quality recognition of all lower-case letters
* bias toward letters rather than numbers
* no ``bad'' recognition of any character

The method by which this is achieved is a large model, and one-size-fits-all
feature extraction prior to matching.  We aim to reach the natural ceiling of
this approach in terms of reliability and accuracy.

This approach will be maintained after its initial release, to offer continued
improvement.  Objectives of maintenance, subject to customer input on priorities,
may include
* continual quality improvement via analytics and model/test curation
* practical dialler mode
* include accented letters
* coarse spatial separation for large-screen input
* minor tweaks to feature extraction to offer better recognition
* (limited) gesture recognition in addition to alphabetical input
* API changes to enable quality analytics and lay a foundation for fast-stroke

## Version 2, 2015Q1

The central objective of version 2 is to use an adaptive engine and
allograph-based model to break through the natural quality ceiling
of the version 1 approach, and thereby to achieve ``great''
recognition of all characters.

This direction will be pursued in parallel with at least a few of the
customer requirements mentioned above.

This direction will be data-driven from information available from
version 1.

The changes necessary to deliver version 2 are a technical waypoint
necessary as a platform for the key features of version 3.

## Version 3, 2015Q2/Q3

The central objective of version 3 is to re-shape the API to enable
integration of Scribble into predictive systems.  These include:
* fast-stroke recognition, offering better temporal/spatial separation
  by estimating probability of completion of a glyph, rather than by
  waiting for a fixed (large) time-out or noting a fixed (large) spacing
* output of sufficient recognition information to enable Scribble-detected
  variables to be used as input into general-purpose predictive/machine-learning
  models
* input of sufficient context information that gesture recognition may be
  influenced by a broader context than merely the writing state

## Backlog

Other items we could consider are listed below.

Integration into a conventional auto-complete-based input method.  This could be
brought forward into v2 timeframe (though it would slow v2 down).  The dictionaries
required by this step would be the same as those required by fast-stroke slated for v3.

Additional machine-friendly character sets.  The engine should be able to handle
character sets such as Cyrillic, Greek, Bopomofo (a pervasive form of Taiwanese input
using a simplified character set also used in education), Katakana/Hiragana and perhaps Hebrew.
These could be supported any time from the projected v3 timeframe onwards (possibly at
the expense of other features).

Difficult character sets: Arabic, Indic and Chinese/Japanese/Korean would require a
technically different approach from that used currently.  There are cultural (not merely
commercial) reasons why these may also be less relevant, since Latin seems to be used
on electronic devices for many of the relevant languages, so the question becomes one of
integration with an assistive entry method rather than recognition of a new character set.
These could be supported any time from the projected v3 timeframe onwards (possibly at
the expense of other features).

Cursive writing: this would require significant analytics and a new approach to matching.
If feasible, the earliest cursive could be practically delivered would be an extended v3
timeframe above (at the expense of the currently-planned v3 deliverables).

The roadmap remains open to customer input.
