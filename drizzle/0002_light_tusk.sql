CREATE TABLE IF NOT EXISTS `followers` (
	`follower_id` integer NOT NULL,
	`followed_id` integer NOT NULL,
	PRIMARY KEY(`followed_id`, `follower_id`),
	FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`followed_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
