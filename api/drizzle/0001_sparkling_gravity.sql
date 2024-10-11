ALTER TABLE `users` ADD `last_seen` TIMESTAMP;
--> statement-breakpoint
ALTER TABLE `users` ADD `about_me` text(200);
--> statement-breakpoint
UPDATE `users`
SET `last_seen` = current_timestamp
WHERE `last_seen` IS NULL;
