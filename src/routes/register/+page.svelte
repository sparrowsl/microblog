<script>
// biome-ignore lint/correctness/noUnusedImports:
import { enhance } from "$app/forms";

// biome-ignore lint/correctness/noUnusedVariables:
const { form } = $props();
</script>

<main class="container max-w-2xl mx-auto">
  <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
    <div class="p-4 sm:p-7">
      <div class="text-center">
        <h1 class="block text-2xl font-bold text-gray-800">Register</h1>
        <p class="mt-2 text-sm text-gray-600">
          Already have an account?
          <a
            class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium"
            href="/login"
          >
            login here
          </a>
        </p>
      </div>

      <div class="mt-10">
        <!-- Form -->
        <form method="post" use:enhance>
          <div class="grid gap-y-4">
            <div>
              <label for="username" class="block text-sm mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm mb-2 dark:text-white">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            <div>
              <label for="password" class="block text-sm mb-2 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            <div>
              <label
                for="confirm-password"
                class="block text-sm mb-2 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm_password"
                class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                required
              />
            </div>

            {#if form?.message}
              <p class="text-red-500 text-center block text-sm italic">
                {form.message}
              </p>
            {/if}

            <button
              type="submit"
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Register
            </button>
          </div>
        </form>
        <!-- End Form -->
      </div>
    </div>
  </div>
</main>
