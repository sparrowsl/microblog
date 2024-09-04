<main class="container max-w-2xl mx-auto">
	<div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
		<div class="p-4 sm:p-7">
			<div class="text-center">
				<h1 class="block text-2xl font-bold text-gray-800 dark:text-white">
					Login
				</h1>
				<p class="mt-2 text-sm text-gray-600 dark:text-neutral-400">
					Don't' have an account?
					<a
						class="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
						href="/register"
					>
						register here
					</a>
				</p>
			</div>

			<div class="mt-10">
				<!-- Form -->
				<form>
					<div class="grid gap-y-4">
						<div>
							<label for="username" class="block text-sm mb-2 dark:text-white">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
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
								class="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
								required
							/>
						</div>

						<!-- Checkbox -->
						<div class="flex items-center">
							<div class="flex">
								<input
									id="remember-me"
									name="remember_me"
									type="checkbox"
									class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
								/>
							</div>

							<label
								for="remember-me"
								class="block ms-3 text-sm dark:text-white"
							>
								Remember Me
							</label>
						</div>

						<button
							type="submit"
							class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
						>
							Login
						</button>
					</div>
				</form>
				<!-- End Form -->
			</div>
		</div>
	</div>
</main>
