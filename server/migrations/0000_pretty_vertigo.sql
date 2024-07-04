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
	`user_id` text NOT NULL,
	`armour` text,
	`leggings` text,
	`helmet` text,
	`boots` text,
	`gloves` text,
	`shield` text,
	`weapon` text,
	`amulet` text,
	`name` text NOT NULL,
	`strength` integer DEFAULT 1 NOT NULL,
	`dexterity` integer DEFAULT 1 NOT NULL,
	`agility` integer DEFAULT 1 NOT NULL,
	`constitution` integer DEFAULT 1 NOT NULL,
	`intelligence` integer DEFAULT 1 NOT NULL,
	`health` integer DEFAULT 50 NOT NULL,
	`level` integer DEFAULT 1 NOT NULL,
	`experience` integer DEFAULT 0 NOT NULL,
	`money` integer DEFAULT 0 NOT NULL,
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
CREATE UNIQUE INDEX `characters_user_id_unique` ON `characters` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `characters_name_unique` ON `characters` (`name`);