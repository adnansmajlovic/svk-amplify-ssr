<script context="module">
  // a.s. no client hydration when false
  // you need to have CognitoIdentity cookies in order for
  // this page to work
  // a.s. hydration disabled to demo ssr
  export const hydrate = false; // comment to enable hydration for SPA behaviour

  import Amplify, { withSSRContext } from 'aws-amplify';

  import awsconfig from '../../aws-exports';
  import { listApps } from '$graphql/queries';

  export async function load({ page, fetch, session, context }) {
    let res = {};

    try {
      const appLimit = 25;

      Amplify.configure({ ...awsconfig, ssr: true });

      // console.log({ headers: session.req.headers });

      const { Auth } = withSSRContext(session);
      const { API } = withSSRContext(session);
      const currentUser = await Auth.currentAuthenticatedUser();
      // console.log({ currentUser });

      res = await API.graphql({
        query: listApps,
      });

      console.log({ res });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
    return { props: { res } };
  }
</script>

<script>
  export let res = {};
  let apps = null;

  if ('data' in res) {
    apps = res.data.listApps.items;
    console.log({ apps });
  }
</script>

<h1>Page 1</h1>

{#if apps}
  <ul>
    {#each apps as app, index}
      <li id={index}>
        {app.name}
      </li>
    {/each}
  </ul>
{:else}
  <h2>no apps</h2>
{/if}
