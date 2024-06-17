CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`picture` text NOT NULL,
	`givenName` text NOT NULL,
	`familyName` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `characters` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`user_id` text,
	`armour` text,
	`leggings` text,
	`helmet` text,
	`boots` text,
	`gloves` text,
	`shield` text,
	`weapon` text,
	`amulet` text,
	`name` text NOT NULL,
	`strength` integer DEFAULT 1,
	`dexterity` integer DEFAULT 1,
	`agility` integer DEFAULT 1,
	`constitution` integer DEFAULT 1,
	`intelligence` integer DEFAULT 1,
	`health` integer DEFAULT 50,
	`level` integer DEFAULT 1,
	`experience` integer DEFAULT 0,
	`money` integer DEFAULT 0,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`armour`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`leggings`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`helmet`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`boots`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`gloves`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`shield`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`weapon`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`amulet`) REFERENCES `equipments`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `equipments` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`image` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`stats` text NOT NULL,
	`level` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `characters_name_unique` ON `characters` (`name`);