import {html} from '@polymer/lit-element';

export default props => html`
<section class="Welcome">
  <img class="SKLogo" draggable="false" src="assets/AnimatedSkeleton.svg" alt="">
  <h1 class="Title">Web Components — Now.</h1>
  <p>
    Take the future and start building your progressive web apps with Polymer Skeleton, the most advanced Polymer starter kit.
  </p>

  <sk-button on-click="startTour">Take a tour</sk-button>
</section>

${
  props.updateReady ?
    html`<sk-button on-click="reload" class="UpdateReadyAlert">Update ready, reload!</sk-button>` : ''
}

<aside class="Meta">
  v${props.appVersion} - ENV: ${props.ENV}
</aside>
`;

