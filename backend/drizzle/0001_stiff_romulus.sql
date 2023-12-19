CREATE TABLE `user_cards` (
	`user_id` integer,
	`card_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`card_id`) REFERENCES `cards`(`card_id`) ON UPDATE no action ON DELETE cascade
);
