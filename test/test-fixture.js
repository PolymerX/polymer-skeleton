
(function () {
  var TestFixturePrototype = Object.create(HTMLElement.prototype);
  var TestFixtureExtension = {
    _fixtureTemplates: null,
    _elementsFixtured: false,
    get elementsFixtured () {
      return this._elementsFixtured;
    },
    get fixtureTemplates () {
      if (!this._fixtureTemplates) {
        // Copy fixtures to a true Array for Safari 7. This prevents their
        // `content` property from being improperly garbage collected.
        this._fixtureTemplates = Array.prototype.slice.apply(this.querySelectorAll('template'));
      }
      return this._fixtureTemplates;
    },
    create: function (model) {
      var generatedDoms = [];
      this.restore();
      this.removeElements(this.fixtureTemplates);
      this.forElements(this.fixtureTemplates, function (fixtureTemplate) {
        generatedDoms.push(
          this.createFrom(fixtureTemplate, model)
        );
      }, this);
      this.forcePolyfillAttachedStateSynchrony();
      if (generatedDoms.length < 2) {
        return generatedDoms[0];
      }
      return generatedDoms;
    },
    createFrom: function (fixtureTemplate, model) {
      var fixturedFragment;
      var fixturedElements;
      var fixturedElement;
      if (!(fixtureTemplate &&
            fixtureTemplate.tagName === 'TEMPLATE')) {
        return;
      }
      try {
        fixturedFragment = this.stamp(fixtureTemplate, model);
      } catch (error) {
        console.error('Error stamping', fixtureTemplate, error);
        throw error;
      }
      fixturedElements = this.collectElementChildren(fixturedFragment);
      this.appendChild(fixturedFragment);
      this._elementsFixtured = true;
      if (fixturedElements.length < 2) {
        return fixturedElements[0];
      }
      return fixturedElements;
    },
    restore: function () {
      if (!this._elementsFixtured) {
        return;
      }
      this.removeElements(this.children);
      this.forElements(this.fixtureTemplates, function (fixtureTemplate) {
        this.appendChild(fixtureTemplate);
      }, this);
      this.generatedDomStack = [];
      this._elementsFixtured = false;
      this.forcePolyfillAttachedStateSynchrony();
    },
    forcePolyfillAttachedStateSynchrony: function () {
      // Force synchrony in attachedCallback and detachedCallback where
      // implemented, in the event that we are dealing with one of these async
      // polyfills:
      // 1. Web Components CustomElements polyfill (v1 or v0).
      if (window.customElements && window.customElements.flush) {
        window.customElements.flush();
      } else if (window.CustomElements && window.CustomElements.takeRecords) {
        window.CustomElements.takeRecords();
      }
      // 2. ShadyDOM polyfill.
      if (window.ShadyDOM && window.ShadyDOM.flush) {
        window.ShadyDOM.flush();
      }
    },
    collectElementChildren: function (parent) {
      // Note: Safari 7.1 does not support `firstElementChild` or
      // `nextElementSibling`, so we do things the old-fashioned way:
      var elements = [];
      var child = parent.firstChild;
      while (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          elements.push(child);
        }
        child = child.nextSibling;
      }
      return elements;
    },
    removeElements: function (elements) {
      this.forElements(elements, function (element) {
        this.removeChild(element);
      }, this);
    },
    forElements: function (elements, iterator, context) {
      Array.prototype.slice.call(elements)
        .forEach(iterator, context);
    },
    stamp: function (fixtureTemplate, model) {
      var stamped;
      // Check if we are dealing with a "stampable" `<template>`. This is a
      // vaguely defined special case of a `<template>` that is a custom
      // element with a public `stamp` method that implements some manner of
      // data binding.
      if (fixtureTemplate.stamp) {
        stamped = fixtureTemplate.stamp(model);
        // We leak Polymer specifics a little; if there is an element `root`, we
        // want that to be returned.
        stamped = stamped.root || stamped;
      // Otherwise, we fall back to standard HTML templates, which do not have
      // any sort of binding support.
      } else {
        if (model) {
          console.warn(this, 'was given a model to stamp, but the template is not of a bindable type');
        }
        stamped = document.importNode(fixtureTemplate.content, true);
        // Immediately upgrade the subtree if we are dealing with async
        // Web Components polyfill.
        // https://github.com/Polymer/polymer/blob/0.8-preview/src/features/mini/template.html#L52
        if (window.CustomElements && window.CustomElements.upgradeSubtree) {
          window.CustomElements.upgradeSubtree(stamped);
        }
      }
      return stamped;
    }
  };
  Object.getOwnPropertyNames(TestFixtureExtension)
    .forEach(function (property) {
      Object.defineProperty(
        TestFixturePrototype,
        property,
        Object.getOwnPropertyDescriptor(TestFixtureExtension, property)
      );
    });
  try {
    if (window.customElements) {
      function TestFixture() {
        return ((window.Reflect && Reflect.construct) ?
            Reflect.construct(HTMLElement, [], TestFixture)
            : HTMLElement.call(this)) || this;
      }
      TestFixture.prototype = TestFixturePrototype;
      // `constructor` is not writable on Safari 9, but is configurable.
      Object.defineProperty(TestFixture.prototype, 'constructor', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: TestFixture,
      });
      window.customElements.define('test-fixture', TestFixture);
    } else {
      document.registerElement('test-fixture', {
        prototype: TestFixturePrototype
      });
    }
  } catch (e) {
    if (window.WCT) {
      console.warn('if you are using WCT, you do not need to manually import test-fixture.html');
    } else {
      console.warn('test-fixture has already been registered!');
    }
  }
})();
