CREATE TABLE IF NOT EXISTS `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`body` text,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text(65),
	`email` text(120),
	`password_hash` text(255)
);
--> statement-breakpoint
CREATE UNIQUE INDEX  IF NOT EXISTS `email_idx` ON `users` (`email`);
