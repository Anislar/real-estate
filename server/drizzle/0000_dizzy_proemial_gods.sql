CREATE TABLE "application" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_date" timestamp with time zone DEFAULT now(),
	"application_status" "application_status" NOT NULL,
	"property_id" integer NOT NULL,
	"tenant_id" integer NOT NULL,
	"message" text,
	"lease_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" text NOT NULL,
	"phoneNumber" text NOT NULL,
	"password" text NOT NULL,
	"is_email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "manager" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" serial PRIMARY KEY NOT NULL,
	"amount_due" double precision NOT NULL,
	"amount_paid" double precision NOT NULL,
	"due_date" timestamp with time zone NOT NULL,
	"payment_date" timestamp with time zone NOT NULL,
	"payment_status" "payment_status" NOT NULL,
	"lease_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lease" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"rent" double precision NOT NULL,
	"deposit" double precision NOT NULL,
	"property_id" integer NOT NULL,
	"tenant_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"country" varchar(255) NOT NULL,
	"postalCode" varchar(255) NOT NULL,
	"coordinates" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price_per_month" double precision NOT NULL,
	"security_deposit" double precision NOT NULL,
	"application_fee" double precision NOT NULL,
	"photo_urls" text[] NOT NULL,
	"amenities" "amenities"[] NOT NULL,
	"highlights" "highlights"[] NOT NULL,
	"is_pets_allowed" boolean DEFAULT false NOT NULL,
	"is_parking_included" boolean DEFAULT false NOT NULL,
	"beds" integer NOT NULL,
	"baths" double precision NOT NULL,
	"square_feet" integer NOT NULL,
	"property_type" "property_type" NOT NULL,
	"posted_date" timestamp with time zone DEFAULT now(),
	"average_rating" double precision DEFAULT 0,
	"number_of_reviews" integer DEFAULT 0,
	"location_id" integer NOT NULL,
	"manager_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_tenant_id_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "application" ADD CONSTRAINT "application_lease_id_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."lease"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "manager" ADD CONSTRAINT "manager_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_lease_id_lease_id_fk" FOREIGN KEY ("lease_id") REFERENCES "public"."lease"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lease" ADD CONSTRAINT "lease_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lease" ADD CONSTRAINT "lease_tenant_id_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant" ADD CONSTRAINT "tenant_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_location_id_location_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_manager_id_manager_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."manager"("id") ON DELETE no action ON UPDATE no action;