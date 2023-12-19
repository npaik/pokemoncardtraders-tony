CREATE TABLE `cards` (
	`card_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`card_name` text NOT NULL,
	`card_url` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `friends` (
	`user_id` integer,
	`friend_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`friend_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`card_id` integer,
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`card_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cards_card_name_unique` ON `cards` (`card_name`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);