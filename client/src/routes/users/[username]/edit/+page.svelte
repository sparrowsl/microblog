<script>
import { goto } from "$app/navigation";
import { PUBLIC_API_HOST } from "$env/static/public";

/** @type {{data: import("./$types").PageData}} */
const { data } = $props();

const payload = $state({
  username: data.user.username,
  about_me: data.user.about_me,
});

/** @param {Event} e */
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
async function update_profile(e) {
  e.preventDefault();

  const res = await fetch(`${PUBLIC_API_HOST}/users/${data.user.username}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  /** @type {import("$lib/types").API_Response} */
  const { data: data2, message } = await res.json();

  if (!res.ok) {
    console.log(message);
    return;
  }

  console.log(data2);

  goto(window.location.pathname, { invalidateAll: true });
}
</script>

<section class="max-w-xl mx-auto py-10">
  <h1 class="font-bold text-xl mb-5">Edit Profile</h1>

  <form action="" method="post" onsubmit={update_profile}>
    <fieldset>
      <div>
        <label for="username" class="block text-sm mb-2 dark:text-white">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          bind:value={payload.username}
          class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
          required
        />
      </div>

      <div>
        <label for="about_me" class="block text-sm mb-2 dark:text-white">
          About me
        </label>
        <textarea
          id="about_me"
          name="about_me"
          bind:value={payload.about_me}
          class="py-3 px-4 block w-full border-gray-200 rounded min-h-20 text-sm disabled:opacity-50 disabled:pointer-events-none"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full py-3 px-4 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none mt-5"
      >
        Submit
      </button>
    </fieldset>
  </form>
</section>
