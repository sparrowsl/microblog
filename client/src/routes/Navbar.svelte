<script>
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { page } from "$app/stores";

// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { logout } from "$lib/cookies.js";
import "iconify-icon";

/** @type {import("$lib/types").User} */
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
const current_user = $derived($page.data.current_user);
</script>

<header
  class="bg-white border-b border-gray-200 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full"
>
  <nav
    class="relative max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-2"
  >
    <!-- Logo -->
    <div class="flex items-center justify-between">
      <a
        class="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80"
        href="/"
      >
        Microblog
      </a>
    </div>
    <!-- End Logo  -->

    <!-- Collapse -->
    <div
      id="hs-header-classic"
      class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
    >
      <div
        class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
      >
        <div
          class="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-end gap-0.5 md:gap-1"
        >
          <a
            class="p-2 text-sm text-gray-800 hover:text-gray-500 focus:outline-none"
            href="/"
          >
            Home
          </a>

          {#if current_user}
            <a
              class="p-2 text-sm text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500"
              href="/users/{current_user.username}"
            >
              Profile
            </a>
          {/if}

          <!-- Button Group -->
          <ul
            class="relative flex items-center gap-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2"
          >
            {#if !current_user}
              <a
                class="p-2 w-full flex items-center gap-1 text-sm text-gray-800 hover:text-gray-500 focus:outline-none"
                href="/login"
              >
                <iconify-icon icon="mdi:login"></iconify-icon>
                Log in
              </a>
              <a
                class="p-2 w-full flex items-center gap-1 text-sm text-gray-800 hover:text-gray-500 focus:outline-none"
                href="/register"
              >
                <iconify-icon icon="mdi:register-outline"></iconify-icon>
                Register
              </a>
            {:else}
              <button
                type="button"
                onclick={logout}
                class="flex items-center gap-1 text-sm text-red-800 hover:text-red-500"
              >
                <iconify-icon icon="mdi:logout"></iconify-icon>
                Logout
              </button>
            {/if}
          </ul>
          <!-- End Button Group -->
        </div>
      </div>
    </div>
    <!-- End Collapse -->
  </nav>
</header>
