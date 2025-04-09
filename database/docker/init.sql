CREATE TABLE public.user (
    id SERIAL PRIMARY KEY,
    user_id TEXT,
    language TEXT,
    current_language TEXT,
    origin_language TEXT,
    ip TEXT,
    ip_country_code TEXT,
    first_ip TEXT,
    first_ip_country_code TEXT,
    register_time BIGINT,
    recent_view_time BIGINT,
    is_deleted BOOLEAN,
    create_time BIGINT,
    delete_time BIGINT,
    last_active_time BIGINT,
    activedays INTEGER,
    user_consecutive_active_days INTEGER,
    last_checkin_date TEXT,
    consecutive_checkin_days INTEGER,
    subscription JSONB,
    subscription_times INTEGER,
    login_time BIGINT,
    user_category_ids TEXT[],
    index_id TEXT,
    device_id TEXT,
    bind_type TEXT,
    bind_id TEXT,
    bind_info JSONB,
    nickname TEXT,
    avatar TEXT,
    device_brand TEXT,
    device_model TEXT,
    os TEXT,
    os_version TEXT,
    client_version TEXT,
    carrier TEXT,
    mac TEXT,
    imei TEXT,
    time_zone TEXT,
    app_id TEXT,
    install_time BIGINT,
    android_id TEXT,
    ga_id TEXT,
    simulator BOOLEAN,
    firebase_token TEXT
);

CREATE INDEX idx_device_id ON public.user (device_id);
CREATE UNIQUE INDEX idx_user_id ON public.user (user_id);
CREATE UNIQUE INDEX idx_index_id ON public.user (index_id);

INSERT INTO public."user"
(user_id, "language", current_language, origin_language, ip, ip_country_code, first_ip, first_ip_country_code, register_time, recent_view_time, is_deleted, create_time, delete_time, last_active_time, activedays, user_consecutive_active_days, last_checkin_date, consecutive_checkin_days, "subscription", subscription_times, login_time, user_category_ids, index_id, device_id, bind_type, bind_id, bind_info,device_brand, device_model, os, os_version, client_version, carrier, mac, imei, time_zone, app_id, install_time, android_id, ga_id, simulator, firebase_token)
VALUES('1FqPZA2P9hFVBKvj', NULL, NULL, 'de_DE', '127.0.0.1', '-', '192.168.180.16', '-', 1743156024, NULL, false, 1743156024, NULL, 1744085121, 7, 2, NULL, 0, '{}'::jsonb, 0, 1744085121, '{11_,1_,27_,30_,24_,31_2,31_,40_,36_}', '6ea1c5df5fe010ff', '6ea1c5df5fe010ff',  NULL, NULL, '{}'::jsonb, 'samsung', 'SM-A516B', 'android', '12', '1.0.0', '', NULL, '', '8', 'com.ai.nutrition.calorie.tracker', 1743155365, '6ea1c5df5fe010ff', 'c28399e7-aab2-4d75-b3fe-9a76c7be4e9c', false, 'fi0BVYfmRxatlOAZfNQ16q:APA91bH2sLtC1rDs5b3dxjBqS6JPxTsHJsmQJJjjJYXcjlK1ROyFpju4C6hlx4EIF8WYepi3EEkAAjTFpzvv4CmSeq_dpEJXvcAMNnv5ACDYC3Bk-S17OWg');