-- Refer to prompts/sampleData.txt
-- run in msql command tool with source /packages/server/prisma/sampleData.sql

-- Insert Products
INSERT INTO products (name, description, price) VALUES
('EcoFlow Solar Generator', 'Portable solar generator ideal for camping and emergency backup.', 899.99),
('ErgoTech Standing Desk', 'Adjustable height desk with memory presets and cable management.', 499.00),
('AeroFit Smart Treadmill', 'Compact treadmill with app integration and heart rate monitoring.', 1199.50),
('BrewMaster Pro Coffee Maker', 'Programmable coffee maker with built-in grinder and thermal carafe.', 249.75),
('SoundWave ANC Headphones', 'Wireless headphones with active noise cancellation and 40-hour battery life.', 179.95);

-- Insert Reviews for EcoFlow Solar Generator
INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Alice M.', 5, 'I took the EcoFlow generator on a week-long camping trip and it exceeded expectations. It charged my devices, powered lights, and even ran a small fan. The solar panels worked great even on cloudy days.', 1, NOW()),
('Brian T.', 4, 'Solid build and reliable performance. I wish the battery lasted a bit longer, but the recharge time is impressive. Great for off-grid adventures.', 1, NOW()),
('Cynthia R.', 5, 'We used this during a power outage and it kept our fridge and router running for hours. Setup was intuitive and the app is a nice touch.', 1, NOW()),
('David K.', 4, 'Perfect for tailgating and outdoor events. It’s quiet, efficient, and easy to transport. Just be sure to angle the panels correctly for max output.', 1, NOW()),
('Elena S.', 5, 'I’ve tried other solar generators, but EcoFlow is by far the most user-friendly. The LCD display gives real-time stats and the build quality is premium.', 1, NOW());

-- Insert Reviews for ErgoTech Standing Desk
INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Frank L.', 5, 'This desk transformed my home office. The motor is quiet, the presets are convenient, and the surface is spacious enough for dual monitors.', 2, NOW()),
('Grace P.', 4, 'Assembly took about an hour, but the instructions were clear. I love switching between sitting and standing throughout the day.', 2, NOW()),
('Henry J.', 5, 'Sturdy and stylish. The cable management tray keeps everything neat, and the memory buttons work flawlessly.', 2, NOW()),
('Isabel V.', 4, 'Great value for the price. I’ve used more expensive desks that don’t offer this level of customization.', 2, NOW()),
('Jackie N.', 5, 'I’ve had this desk for six months and it’s held up beautifully. The finish is scratch-resistant and the motor hasn’t faltered once.', 2, NOW());

-- Insert Reviews for AeroFit Smart Treadmill
INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Kevin B.', 5, 'Compact yet powerful. Fits perfectly in my apartment and syncs with my fitness app. The incline feature is a bonus.', 3, NOW()),
('Laura G.', 4, 'Smooth running experience and the heart rate monitor is surprisingly accurate. I wish the speakers were louder.', 3, NOW()),
('Mike D.', 5, 'I use this treadmill daily and it’s been a game changer. The belt is quiet and the shock absorption is great for my knees.', 3, NOW()),
('Nina H.', 4, 'Easy to fold and store. The display is intuitive and tracks all the metrics I care about.', 3, NOW()),
('Oscar W.', 5, 'I’ve owned several treadmills and this one stands out for its smart features and compact design. Highly recommend.', 3, NOW());

-- Insert Reviews for BrewMaster Pro Coffee Maker
INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Paula Z.', 5, 'This coffee maker is a dream. The grinder ensures fresh beans every time and the thermal carafe keeps coffee hot for hours.', 4, NOW()),
('Quentin R.', 4, 'Easy to program and clean. The brew strength selector lets me customize my morning cup perfectly.', 4, NOW()),
('Rachel T.', 5, 'I’m a coffee snob and this machine delivers. The aroma, taste, and consistency are top-notch.', 4, NOW()),
('Sam Y.', 4, 'Great for busy mornings. I set it the night before and wake up to fresh coffee. The grinder is a bit loud but worth it.', 4, NOW()),
('Tina C.', 5, 'Stylish and functional. It looks great on my counter and performs like a commercial-grade machine.', 4, NOW());

-- Insert Reviews for SoundWave ANC Headphones
INSERT INTO reviews (author, rating, content, productId, createdAt) VALUES
('Uma F.', 5, 'Crystal clear sound and the noise cancellation is phenomenal. I use these daily for work and travel.', 5, NOW()),
('Victor M.', 4, 'Battery life is impressive and the Bluetooth range is solid. They’re comfortable for long listening sessions.', 5, NOW()),
('Wendy S.', 5, 'I’ve tried Bose and Sony, but these hold their own. The bass is rich and the mids are well-balanced.', 5, NOW()),
('Xander L.', 4, 'Sleek design and great audio quality. The touch controls are responsive and intuitive.', 5, NOW()),
('Yasmine D.', 5, 'These headphones exceeded my expectations. The ANC blocks out subway noise completely and the mic is great for calls.', 5, NOW());
