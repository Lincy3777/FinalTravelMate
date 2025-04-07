--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-07 09:08:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 25835)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 25853)
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refreshToken" text,
    "accessToken" text,
    "expiresAt" integer,
    "tokenType" text,
    scope text,
    "idToken" text,
    "sessionState" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25861)
-- Name: Listing; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Listing" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "imageSrc" text NOT NULL,
    category text NOT NULL,
    "roomCount" integer NOT NULL,
    "bathroomCount" integer NOT NULL,
    "guestCount" integer NOT NULL,
    "locationValue" text NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."Listing" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 25869)
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "listingId" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "totalPrice" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25845)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "hashedPassword" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "favoriteIds" text[]
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25836)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 26126)
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id text NOT NULL,
    session_token text NOT NULL,
    user_id text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- TOC entry 4887 (class 0 OID 25853)
-- Dependencies: 219
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", "refreshToken", "accessToken", "expiresAt", "tokenType", scope, "idToken", "sessionState", "createdAt") FROM stdin;
\.


--
-- TOC entry 4888 (class 0 OID 25861)
-- Dependencies: 220
-- Data for Name: Listing; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Listing" (id, title, description, "imageSrc", category, "roomCount", "bathroomCount", "guestCount", "locationValue", price, "createdAt", "userId") FROM stdin;
a1aaae69-066a-4f6c-8370-f148360cec0d	Surf & Sand: Adventure Awaits at Our Beach House	Calling all adventure seekers! Our beachfront haven is your gateway to endless surf and sand adventures. With direct access to world-class waves, nearby hiking trails, and a fully equipped outdoor gear storage, this is the perfect basecamp for your coastal exploration. After a day of thrills, unwind on the patio and watch the sun dip below the horizon.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-connie-mulloy-323498-979190-ydVn7ob40pYJyAOt6RTW05HaYX5LSu.jpg	Beach	3	4	4	AW	2000	2025-04-01 05:41:19.501	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
22bed974-45d7-47e2-b11a-f777418bd258	Modern Marvel: Downtown Penthouse with stunning Views	Discover a modern marvel in the heart of downtown, where sleek design and breathtaking views converge. This penthouse is a showcase of contemporary elegance, featuring smart home technology, designer finishes, and a private balcony overlooking the city's vibrant landscape. Enjoy the ultimate urban experience, with world-class dining and entertainment just steps away	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-madbyte-36362-KP1C4hXBA6inX5U8n1PYV6CchS9MOl.jpg	Modern	4	4	5	AI	3500	2025-04-01 05:59:51.442	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
292d26fc-201d-41ce-8581-be81a2cd2312	Time Traveler's Guide: Discover a Real Castle	Become a time traveler and explore the wonders of this historic castle. Its grand halls and ancient walls are waiting for you to discover their stories. Learn about medieval life, architectural marvels, and the fascinating history that shaped this incredible place. Get ready for an adventure that will bring history to life.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-cornellana-877994-1pfcfbxgyJTO6bPxcmHP2k0dgGbtGz.jpg	Castles	10	10	10	AL	3700	2025-04-01 06:03:55.582	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
d140c875-c457-41c0-8783-a3ca6a7fdd7c	Hilltop Heaven: A Penthouse Escape to Rural Bliss	Discover your hilltop haven, a penthouse escape that offers a luxurious retreat into rural bliss. Enjoy sweeping views of the surrounding countryside, where verdant fields meet the horizon. This residence features a contemporary design, a private rooftop terrace for stargazing, and all the modern comforts you desire. Immerse yourself in the tranquility of nature, while still enjoying the sophistication of penthouse living.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-marek-piwnicki-3907296-31346412-pdYrM7pny3ikG1SrsiQOKY5Fu2Rf0r.jpg	Countryside	2	2	3	AF	1500	2025-04-01 06:07:48.958	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
e0367c25-1b7e-47f0-b91f-197b911f16f5	Treetop Trails & Campfire Tales: Rustic Adventure	Unleash your inner explorer with our treetop trails and campfire tales adventure. Our property features a rustic treehouse and a campsite, offering the perfect blend of comfort and wilderness. Spend your days hiking through scenic trails, and your nights sharing stories around a crackling campfire. Enjoy the simplicity of nature, elevated to new heights.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-isabella-mendes-107313-1795508-ywwQ8sN3DGkQhsm6Xscs8pppbLoHsi.jpg	Camping	1	1	2	AW	1000	2025-04-01 06:11:40.708	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
b1a1e784-d55e-47f2-a93d-85b6aff0549a	Heritage Hideaway: A Step into History's Embrace	Find refuge in our heritage hideaway, a historical home where the past embraces you with its warmth. This lovingly preserved residence offers a peaceful retreat, filled with antique treasures and the lingering scent of history. Stroll through its gardens, relax in its cozy parlors, and let the stories of its former inhabitants transport you.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-tommaso-31360094-BvPQE3sHs02IGvv2OJ9tb8keGoQgDq.jpg	Historical	4	4	4	ES	4000	2025-04-01 06:18:06.191	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
45541bdd-c9e3-47b4-af60-f16cd3b15079	Chronicles in Architecture: A Historical Home's Tale	Uncover the chronicles etched in architecture within this captivating historical home. Its very structure tells a tale of generations past, with each room a chapter in its story. Experience the charm of original craftsmanship, from ornate moldings to antique fireplaces. This isn't just a house; it's a journey through time.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-rachel-claire-6761047-xy9WyP1UuHngnUVDEY34WRHAzw1JXa.jpg	Historical	4	4	4	IS	5000	2025-04-01 06:20:47.059	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
28e01e90-1a39-4785-b8f3-3d651682a9f7	Vintage Charm, Refreshing Dip: A Historical Poolside Retreat	Step into a bygone era, then dive into modern relaxation. Our historical house, lovingly restored to its former glory, features a stunning pool, offering a refreshing escape from the summer heat. Wander through rooms filled with antique treasures, then cool off in the crystal-clear waters, creating a unique blend of past and present.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/manor-house-2359884_640-AV3zqJSyjELDShOBjBMM81nM4sUbaV.jpg	Pools	4	3	4	IN	900	2025-04-01 06:34:51.761	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
a3914d2b-13aa-4069-87fb-7a7a101e913e	Royal Echoes: Immerse Yourself in Castle History	Immerse yourself in royal echoes at our historical castle, a residence fit for kings and queens. This magnificent estate, with its grand halls, opulent chambers, and sprawling grounds, offers a glimpse into the lives of nobility. Explore its historical treasures, admire its architectural splendor, and experience the regal ambiance that permeates its walls.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/castle-3619698_640-3cUoCcHPA5Wu0zRjDG7sEIVXzIzMt8.jpg	Castles	10	10	9	GB	5000	2025-04-01 06:42:07.431	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8
9663af1b-c692-4e52-a682-c7ef4b7fd788	Above the Ordinary: A Charming Treehouse Adventure	 Escape the hustle and bustle of Mumbai and ascend to your unique treetop haven. Experience the tranquility of nature from a new perspective, where the air is fresher and the views are simply magical. Perfect for a romantic escape, a solo retreat, or a memorable small family adventure.	https://nulwoevywftvey9d.public.blob.vercel-storage.com/pexels-caleboquendo-3018035-lKrm1JdEPCo9RcMTOSNx0ak2CDgHHB.jpg	Camping	1	1	1	AR	1000	2025-04-05 04:22:57.923	0204d029-c7d5-4d13-b09d-6ad53c21c030
\.


--
-- TOC entry 4889 (class 0 OID 25869)
-- Dependencies: 221
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Reservation" (id, "userId", "listingId", "startDate", "endDate", "totalPrice", "createdAt") FROM stdin;
8c40fe37-d2e5-4792-88e2-5a53246c8bcc	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8	b1a1e784-d55e-47f2-a93d-85b6aff0549a	2025-04-19 18:30:00	2025-04-25 18:30:00	24000	2025-04-01 11:53:18.545
47e75d71-e4da-4f4f-8f82-895cdf01a2bf	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8	b1a1e784-d55e-47f2-a93d-85b6aff0549a	2025-04-08 18:30:00	2025-04-11 18:30:00	12000	2025-04-01 12:19:06.978
33e65477-0eb7-4708-8bf2-d8780fe1b1c8	0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8	28e01e90-1a39-4785-b8f3-3d651682a9f7	2025-04-15 18:30:00	2025-04-16 18:30:00	900	2025-04-01 12:40:15.001
a6d7d23c-0cad-406a-9847-6561163f7807	0204d029-c7d5-4d13-b09d-6ad53c21c030	b1a1e784-d55e-47f2-a93d-85b6aff0549a	2025-10-20 18:30:00	2025-10-24 18:30:00	16000	2025-04-05 05:03:57.769
\.


--
-- TOC entry 4886 (class 0 OID 25845)
-- Dependencies: 218
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", image, "hashedPassword", "createdAt", "updatedAt", "favoriteIds") FROM stdin;
0f4b5df1-c5ea-45d3-b1b2-e7a97c3decf8	lincy	lincyJes@gmail.com	\N	\N	$2b$12$nRYSGy8Yl/AT7qM8Q7c04u.aaVSnXpWmSAHRIOUrq9jtWOc6cIvMG	2025-02-14 15:01:34.292	2025-03-30 12:44:33.103	{}
ccd8b2e2-1c39-4c3b-be53-1e82d29460b9	Lincy Thomas	lincythomas@gamil.com	\N	\N	$2b$12$mN7TcfhS1xQBKumzR5j1hOLkEd86v6tvQiHZFzp.SoXBreRFdvO8a	2025-04-01 14:56:40.192	2025-04-01 14:56:40.192	\N
d4db91e3-4e01-44be-bcda-1549d7204d24	Lincy	lincy123@gmail.com	\N	\N	$2b$12$1N56i2aGje31lVrdm8pBx.MqCDApE2n/an1wKNgMHItPXOJ2FJHau	2025-04-04 19:21:38.765	2025-04-04 19:21:38.765	\N
0204d029-c7d5-4d13-b09d-6ad53c21c030	Admin123	admin@gmail.com	\N	\N	$2b$12$uwC3mgWk/0iDLPqNf6dGFuGcnnYgY7NAqnmkbM2YsRJHKLtIjydhm	2025-04-01 14:55:13.22	2025-04-05 05:00:56.783	{22bed974-45d7-47e2-b11a-f777418bd258,28e01e90-1a39-4785-b8f3-3d651682a9f7,e0367c25-1b7e-47f0-b91f-197b911f16f5}
\.


--
-- TOC entry 4885 (class 0 OID 25836)
-- Dependencies: 217
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
2037d580-ffa6-4843-a970-52481aeb3618	a4bf9be09a677762968fb9e53fceb71199e3d368ef19f2d762fbf73438fd8268	2025-02-03 13:09:17.367581+05:30	20241221062741_lincy	\N	\N	2025-02-03 13:09:17.313768+05:30	1
ee3bd32f-3dc1-452c-bb74-ffc05272a90b	84cdf75572dbc4a1bab40686fbd6215a3540d33bc68f9f5f14d7ae58ebeb2d99	2025-02-03 13:09:18.498662+05:30	20250203073918_fix_account_fields	\N	\N	2025-02-03 13:09:18.488372+05:30	1
4052a927-69f2-4cd5-8f26-7bced697542b	58d605269da979a82bf3090ed801f6fce35714db2ee06cc2be54672c2cda000a	2025-03-16 19:16:17.452102+05:30	20250316134617_update_itinerary_schema	\N	\N	2025-03-16 19:16:17.437401+05:30	1
003ac63e-f85c-4ac9-9fca-e950b1fd95f3	ef9a9855506c849107a0625055e0dde68bc7fe33cf9c9b9ed949f7fac7d337f4	2025-04-06 22:34:34.851922+05:30	20250406170434_final_db	\N	\N	2025-04-06 22:34:34.830398+05:30	1
\.


--
-- TOC entry 4890 (class 0 OID 26126)
-- Dependencies: 222
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, session_token, user_id, expires) FROM stdin;
\.


--
-- TOC entry 4726 (class 2606 OID 25860)
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- TOC entry 4729 (class 2606 OID 25868)
-- Name: Listing Listing_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listing"
    ADD CONSTRAINT "Listing_pkey" PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 25876)
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 25852)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 25844)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 26132)
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 1259 OID 25902)
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- TOC entry 4722 (class 1259 OID 25901)
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- TOC entry 4734 (class 1259 OID 26133)
-- Name: sessions_session_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX sessions_session_token_key ON public.sessions USING btree (session_token);


--
-- TOC entry 4735 (class 2606 OID 25903)
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4736 (class 2606 OID 25908)
-- Name: Listing Listing_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Listing"
    ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4737 (class 2606 OID 25918)
-- Name: Reservation Reservation_listingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES public."Listing"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4738 (class 2606 OID 25913)
-- Name: Reservation Reservation_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4739 (class 2606 OID 26134)
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2025-04-07 09:08:30

--
-- PostgreSQL database dump complete
--

