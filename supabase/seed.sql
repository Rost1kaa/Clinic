insert into public.roles (id, key, name, description, permissions)
values
  ('00000000-0000-0000-0000-000000000001', 'super_admin', 'Super Admin', 'System-wide administrative access', '{"bookings": true, "content": true, "settings": true}'::jsonb),
  ('00000000-0000-0000-0000-000000000002', 'manager', 'Manager', 'Operational access to bookings, schedules, and services', '{"bookings": true, "catalog": true, "availability": true}'::jsonb),
  ('00000000-0000-0000-0000-000000000003', 'content_editor', 'Content Editor', 'Editorial access to news and testimonials', '{"news": true, "testimonials": true}'::jsonb)
on conflict (key) do update
set
  name = excluded.name,
  description = excluded.description,
  permissions = excluded.permissions;

insert into public.specialties (
  id,
  slug,
  name_ka,
  summary_ka,
  description_ka,
  care_path_ka,
  icon,
  image_url,
  image_credit_url,
  sort_order,
  featured,
  is_active
)
values
  ('10000000-0000-0000-0000-000000000001', 'therapist', 'თერაპევტი', 'პირველადი შეფასება, მწვავე სიმპტომების მართვა და შემდგომი გეგმა.', 'თერაპევტის გუნდი უზრუნველყოფს პაციენტის პირველადი მდგომარეობის შეფასებას, მკურნალობის კოორდინაციასა და საჭიროების შემთხვევაში სპეციალიზებულ მიმართვას.', 'სახლში ვიზიტი და ონლაინ შეფასება', 'stethoscope', 'https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710156_1280.jpg', 'https://pixabay.com/photos/doctor-patient-consultation-5710156/', 1, true, true),
  ('10000000-0000-0000-0000-000000000002', 'cardiologist', 'კარდიოლოგი', 'გულის რითმის, წნევის და ქრონიკული მართვის შეფასება.', 'კარდიოლოგიური მომსახურება მოიცავს კონსულტაციას, ECG/ჰოლტერის კოორდინაციას და მკურნალობის კორექციას.', 'სახლში ECG-თან ერთად', 'heart-pulse', null, null, 2, true, true),
  ('10000000-0000-0000-0000-000000000003', 'neurologist', 'ნევროლოგი', 'თავის ტკივილი, თავბრუსხვევა, ნევროლოგიური სიმპტომების შეფასება.', 'ნევროლოგიური გუნდი მუშაობს როგორც დისტანციურ კონსულტაციებზე, ასევე ვიზიტებზე ქრონიკული ან მწვავე სიმპტომების სამართავად.', 'ონლაინ განმეორებითი ვიზიტები', 'brain', null, null, 3, true, true),
  ('10000000-0000-0000-0000-000000000004', 'palliative-care', 'პალიატიური მზრუნველობა', 'სიმპტომების შემსუბუქება და ოჯახის მხარდაჭერა სახლში.', 'პალიატიური გუნდი აერთიანებს ექიმს, ექთანს და გეგმიურ მონიტორინგს ღირსეული და მშვიდი მოვლისთვის.', 'გრძელი მოვლის პროგრამა', 'heart-handshake', null, null, 4, true, true),
  ('10000000-0000-0000-0000-000000000005', 'endocrinologist', 'ენდოკრინოლოგი', 'ჰორმონალური და მეტაბოლური მდგომარეობების მართვა.', 'ენდოკრინოლოგიური კონსულტაციები განკუთვნილია დიაბეტის, ფარისებრი ჯირკვლისა და მეტაბოლური დარღვევების კონტროლისთვის.', 'ონლაინ კონტროლი და ანალიზების მიმოხილვა', 'pill', null, null, 5, true, true),
  ('10000000-0000-0000-0000-000000000006', 'nurse-home-visit', 'ექთნის სახლში ვიზიტი', 'ინფუზია, ინექცია, გასინჯვა და მოვლის პროცესის მხარდაჭერა.', 'ექთნის გუნდი ასრულებს სამედიცინო მანიპულაციებს, ნიმუშის აღებასა და პაციენტის მდგომარეობის ოპერატიულ მონიტორინგს სახლში.', 'დაგეგმილი და სწრაფი ვიზიტები', 'syringe', null, null, 6, true, true)
on conflict (slug) do update
set
  name_ka = excluded.name_ka,
  summary_ka = excluded.summary_ka,
  description_ka = excluded.description_ka,
  care_path_ka = excluded.care_path_ka,
  icon = excluded.icon,
  image_url = excluded.image_url,
  image_credit_url = excluded.image_credit_url,
  sort_order = excluded.sort_order,
  featured = excluded.featured,
  is_active = excluded.is_active,
  deleted_at = null;

insert into public.services (
  id,
  specialty_id,
  slug,
  name_ka,
  summary_ka,
  description_ka,
  service_mode,
  price,
  duration_minutes,
  requires_address,
  requires_video_link,
  image_url,
  image_credit_url,
  tags,
  sort_order,
  featured,
  is_active
)
values
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'therapist-home-visit', 'თერაპევტის სახლში ვიზიტი', 'მწვავე სიმპტომების შეფასება და მკურნალობის გეგმა თქვენს მისამართზე.', 'სერვისი მოიცავს პირველადი შეფასებას, ფიზიკურ გასინჯვას, რეკომენდაციებსა და საჭიროების შემთხვევაში შემდგომი კვლევების დაგეგმვას.', 'home_visit', 120, 60, true, false, 'https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg', 'https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/', '{"პირველადი შეფასება","სახლში ვიზიტი","ოჯახური მედიცინა"}', 1, true, true),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'cardiologist-home-visit', 'კარდიოლოგის სახლში ვიზიტი', 'გულის ჯანმრთელობის შეფასება ECG-თან კომბინირების შესაძლებლობით.', 'კარდიოლოგი ადგენს რისკებს, აფასებს სიმპტომებს და აწყობს შემდგომ მართვას სახლში ჩატარებულ დიაგნოსტიკასთან ერთად.', 'home_visit', 180, 75, true, false, 'https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710156_1280.jpg', 'https://pixabay.com/photos/doctor-patient-consultation-5710156/', '{"კარდიოლოგია","ECG","მონიტორინგი"}', 2, true, true),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'neurologist-online-consultation', 'ნევროლოგის ონლაინ კონსულტაცია', 'წინასწარი შეფასება, ანალიზების განხილვა და შემდგომი მართვის რეკომენდაცია.', 'ვიდეოკონსულტაციის ფორმატში ექიმი აფასებს სიმპტომების ისტორიას, არსებული კვლევების პასუხებსა და დაგეგმავს მომდევნო ნაბიჯებს.', 'online_consultation', 90, 40, false, true, 'https://cdn.pixabay.com/photo/2021/04/10/11/53/telemedicine-6166814_1280.jpg', 'https://pixabay.com/photos/telemedicine-doctor-laptop-6166814/', '{"ვიდეო ვიზიტი","ნევროლოგია","მეორე აზრი"}', 3, true, true),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000005', 'endocrinologist-online-consultation', 'ენდოკრინოლოგის ონლაინ კონსულტაცია', 'დიაბეტის და ჰორმონალური მდგომარეობების დისტანციური მონიტორინგი.', 'სერვისი მოიცავს ანალიზების შეფასებას, მკურნალობის კორექციის განხილვას და ცხოვრების წესის პრაქტიკულ რეკომენდაციებს.', 'online_consultation', 95, 40, false, true, 'https://cdn.pixabay.com/photo/2022/10/14/07/43/telemedicine-7520691_640.jpg', 'https://cdn.pixabay.com/photo/2022/10/14/07/43/telemedicine-7520691_640.jpg', '{"ენდოკრინოლოგია","ონლაინ მონიტორინგი","ანალიზები"}', 4, true, true),
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000004', 'palliative-home-care-visit', 'პალიატიური მზრუნველობის ვიზიტი', 'ტკივილის კონტროლი, სიმპტომური მხარდაჭერა და ოჯახის კონსულტაცია.', 'ვიზიტი ეძღვნება პაციენტის კომფორტს, მედიკამენტური მართვის კორექციას და ყოველდღიური მოვლის კოორდინაციას.', 'home_visit', 210, 90, true, false, 'https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg', 'https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/', '{"პალიატიური მოვლა","სახლში ვიზიტი","ოჯახის მხარდაჭერა"}', 5, true, true),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006', 'nurse-home-visit', 'ექთნის სახლში ვიზიტი', 'ინფუზია, ინექცია, სისხლის აღება და მოვლის მხარდაჭერა.', 'ექთანი ახორციელებს მანიპულაციებს, ამოწმებს პარამეტრებს და საჭიროების შემთხვევაში უკავშირდება ექიმს ერთიანი ჩანაწერის ფარგლებში.', 'home_visit', 70, 45, true, false, 'https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg', 'https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/', '{"ექთანი","ინფუზია","სისხლის აღება"}', 6, true, true)
on conflict (slug) do update
set
  specialty_id = excluded.specialty_id,
  name_ka = excluded.name_ka,
  summary_ka = excluded.summary_ka,
  description_ka = excluded.description_ka,
  service_mode = excluded.service_mode,
  price = excluded.price,
  duration_minutes = excluded.duration_minutes,
  requires_address = excluded.requires_address,
  requires_video_link = excluded.requires_video_link,
  image_url = excluded.image_url,
  image_credit_url = excluded.image_credit_url,
  tags = excluded.tags,
  sort_order = excluded.sort_order,
  featured = excluded.featured,
  is_active = excluded.is_active,
  deleted_at = null;

insert into public.diagnostics (
  id,
  slug,
  name_ka,
  summary_ka,
  description_ka,
  price,
  duration_minutes,
  home_available,
  image_url,
  image_credit_url,
  sort_order,
  featured,
  is_active
)
values
  ('30000000-0000-0000-0000-000000000001', 'instrumental-diagnostics', 'ინსტრუმენტული დიაგნოსტიკა', 'მობილური დიაგნოსტიკური პაკეტები ინდივიდუალური საჭიროების მიხედვით.', 'კოორდინირებული დიაგნოსტიკური მომსახურება, რომელიც მოიცავს მობილურ აპარატურასა და შედეგების ორგანიზებულ მიწოდებას.', 150, 60, true, 'https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg', 'https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/', 1, true, true),
  ('30000000-0000-0000-0000-000000000002', 'electrocardiography-ecg', 'ელექტროკარდიოგრაფია (ECG)', 'გულის რითმის სწრაფი და სანდო შეფასება ადგილზე.', 'ECG მომსახურება ხელმისაწვდომია სახლში ვიზიტთან ერთად ან ცალკე, კარდიოლოგის რეკომენდაციების ინტეგრაციით.', 55, 25, true, 'https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg', 'https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/', 2, true, true),
  ('30000000-0000-0000-0000-000000000003', 'echocardiography', 'ექოკარდიოგრაფია', 'გულის სტრუქტურული და ფუნქციური შეფასება სპეციალისტის დასკვნით.', 'ექოკარდიოგრაფიული კვლევა გამოიყენება სიმპტომების ღრმა შეფასებისთვის და მკურნალობის კორექციის მხარდასაჭერად.', 165, 45, true, 'https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg', 'https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/', 3, true, true),
  ('30000000-0000-0000-0000-000000000004', 'abdominal-ultrasound', 'მუცლის ღრუს ულტრაბგერითი კვლევა', 'ორგანოების არაინვაზიური შეფასება მობილური ულტრაბგერითი აპარატით.', 'კვლევა დაგეხმარებათ დიფერენციულ დიაგნოსტიკაში და შემდგომი მართვის სწორად დაგეგმვაში.', 145, 35, true, 'https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg', 'https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/', 4, true, true),
  ('30000000-0000-0000-0000-000000000005', 'radiology-xray', 'რადიოლოგია / X-ray დიაგნოსტიკა', 'გეგმიური ან მითითებული შემთხვევებისათვის ორგანიზებული რადიოლოგიური მხარდაჭერა.', 'პლატფორმა უზრუნველყოფს კვლევის დაჯავშნას, ექიმის რეკომენდაციის და შედეგების კომუნიკაციას ერთიან პროცესში.', 180, 50, false, 'https://cdn.pixabay.com/photo/2020/11/03/15/31/doctor-5710156_1280.jpg', 'https://pixabay.com/photos/doctor-patient-consultation-5710156/', 5, false, true),
  ('30000000-0000-0000-0000-000000000006', 'holter-monitoring', '24-საათიანი ჰოლტერ მონიტორინგი', 'გულის რითმის ხანგრძლივი მონიტორინგი კარდიოლოგიური რისკების შესაფასებლად.', 'ჰოლტერის მომსახურება მოიცავს აპარატის დაყენებას, განმარტებას და შემდგომი შეფასების დაგეგმვას.', 190, 30, true, 'https://cdn.pixabay.com/photo/2014/10/30/15/49/ultrasound-509396_1280.jpg', 'https://pixabay.com/photos/ultrasound-x-ray-image-hospital-509396/', 6, true, true)
on conflict (slug) do update
set
  name_ka = excluded.name_ka,
  summary_ka = excluded.summary_ka,
  description_ka = excluded.description_ka,
  price = excluded.price,
  duration_minutes = excluded.duration_minutes,
  home_available = excluded.home_available,
  image_url = excluded.image_url,
  image_credit_url = excluded.image_credit_url,
  sort_order = excluded.sort_order,
  featured = excluded.featured,
  is_active = excluded.is_active,
  deleted_at = null;

insert into public.laboratory_services (
  id,
  slug,
  category,
  name_ka,
  summary_ka,
  description_ka,
  price,
  duration_minutes,
  home_available,
  image_url,
  image_credit_url,
  sort_order,
  featured,
  is_active
)
values
  ('40000000-0000-0000-0000-000000000001', 'hematology-panel', 'Hematology', 'ჰემატოლოგიური პანელი', 'სისხლის საერთო ანალიზი და ჰემატოლოგიური პროფილის საბაზისო შეფასება.', 'ნიმუშის აღება შეიძლება სახლში, ხოლო პასუხები უსაფრთხოდ იგზავნება ციფრულ არხებში.', 35, 20, true, 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 1, true, true),
  ('40000000-0000-0000-0000-000000000002', 'biochemistry-panel', 'Biochemistry', 'ბიოქიმიური პანელი', 'ღვიძლის, თირკმლისა და მეტაბოლური მაჩვენებლების შეფასება.', 'ბიოქიმიური პანელი გამოიყენება როგორც პირველადი სკრინინგისთვის, ისე ქრონიკული მდგომარეობების მონიტორინგისთვის.', 55, 20, true, 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 2, true, true),
  ('40000000-0000-0000-0000-000000000003', 'immunology-panel', 'Immunology', 'იმუნოლოგიური პანელი', 'იმუნური პასუხის და სპეციფიკური ინდიკატორების შეფასება.', 'შერჩეული იმუნოლოგიური ტესტები ხელმისაწვდომია ექიმის მითითებითა და შედეგების განხილვის მხარდაჭერით.', 85, 20, true, 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 3, false, true),
  ('40000000-0000-0000-0000-000000000004', 'coagulation-panel', 'Coagulation', 'კოაგულაციის პანელი', 'სისხლის შედედების მაჩვენებლების კონტროლი სპეციალისტის მითითებით.', 'განსაკუთრებით მნიშვნელოვანია ანტიკოაგულაციური თერაპიის ან ოპერაციული მზადების პროცესში.', 48, 20, true, 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 4, true, true)
on conflict (slug) do update
set
  category = excluded.category,
  name_ka = excluded.name_ka,
  summary_ka = excluded.summary_ka,
  description_ka = excluded.description_ka,
  price = excluded.price,
  duration_minutes = excluded.duration_minutes,
  home_available = excluded.home_available,
  image_url = excluded.image_url,
  image_credit_url = excluded.image_credit_url,
  sort_order = excluded.sort_order,
  featured = excluded.featured,
  is_active = excluded.is_active,
  deleted_at = null;

insert into public.doctors (
  id,
  specialty_id,
  slug,
  full_name_ka,
  title_ka,
  bio_ka,
  experience_years,
  languages,
  is_featured,
  is_active
)
values
  ('50000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'ketevan-gelashvili', 'ქეთევან გელაშვილი', 'თერაპევტი, ოჯახის ექიმი', 'პირველადი შეფასებისა და ქრონიკული მდგომარეობების მართვის 12-წლიანი გამოცდილებით.', 12, '{"ქართული","ინგლისური","რუსული"}', true, true),
  ('50000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000002', 'lasha-bakradze', 'ლაშა ბაქრაძე', 'კარდიოლოგი', 'გულის რიტმის დარღვევებისა და ამბულატორიული კარდიოლოგიის პრაქტიკოსი.', 14, '{"ქართული","ინგლისური"}', true, true),
  ('50000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'ana-kharadze', 'ანა ხარაძე', 'ნევროლოგი', 'თავის ტკივილის, ვესტიბულარული და ქრონიკული ნევროლოგიური სიმპტომების მართვაში გამოცდილებით.', 11, '{"ქართული","ინგლისური"}', true, true),
  ('50000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000004', 'nino-lomidze', 'ნინო ლომიძე', 'პალიატიური მზრუნველობის სპეციალისტი', 'სახლში მოვლის პროგრამებს კოორდინაციას უწევს პაციენტისა და ოჯახის საჭიროებებზე ფოკუსით.', 16, '{"ქართული","რუსული"}', true, true),
  ('50000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', 'giorgi-abadze', 'გიორგი აბაძე', 'ენდოკრინოლოგი', 'დიაბეტის და თირეოიდული დარღვევების დისტანციური მონიტორინგის პრაქტიკით.', 9, '{"ქართული","ინგლისური"}', true, true),
  ('50000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006', 'mariam-tsiklauri', 'მარიამ წიკლაური', 'უფროსი ექთანი', 'ინფუზიური თერაპიის, ნიმუშის აღებისა და სახლში გეგმიური მოვლის გამოცდილებით.', 10, '{"ქართული"}', true, true)
on conflict (slug) do update
set
  specialty_id = excluded.specialty_id,
  full_name_ka = excluded.full_name_ka,
  title_ka = excluded.title_ka,
  bio_ka = excluded.bio_ka,
  experience_years = excluded.experience_years,
  languages = excluded.languages,
  is_featured = excluded.is_featured,
  is_active = excluded.is_active,
  deleted_at = null;

insert into public.news_categories (id, slug, name_ka, description_ka)
values
  ('60000000-0000-0000-0000-000000000001', 'updates', 'განახლებები', 'კლინიკური სერვისებისა და პლატფორმის მნიშვნელოვანი სიახლეები.'),
  ('60000000-0000-0000-0000-000000000002', 'prevention', 'პრევენცია', 'პრაქტიკული რჩევები ყოველდღიური ჯანმრთელობისთვის.'),
  ('60000000-0000-0000-0000-000000000003', 'digital-care', 'ციფრული მოვლა', 'ონლაინ კონსულტაციისა და ციფრული პროცესების შესახებ.')
on conflict (slug) do update
set
  name_ka = excluded.name_ka,
  description_ka = excluded.description_ka;

insert into public.news_posts (
  id,
  category_id,
  slug,
  title_ka,
  excerpt_ka,
  content_markdown,
  cover_image_url,
  cover_image_credit_url,
  tags,
  is_published,
  published_at,
  related_slugs
)
values
  ('70000000-0000-0000-0000-000000000001', '60000000-0000-0000-0000-000000000001', 'home-cardiology-ecg-launch', 'სახლში კარდიოლოგიური ვიზიტი უკვე ECG მხარდაჭერით', 'Velora Care-მა განაახლა კარდიოლოგიური სერვისი, რათა სახლში ვიზიტს ECG და შემდგომი შეფასების ერთიანი პროცესი დაუმატოს.', '## რა შეიცვალა\n\nახლა პაციენტს შეუძლია კარდიოლოგის ვიზიტთან ერთად **ECG მომსახურებაც** ერთ ჯავშანში დაგეგმოს.\n\n## ვის გამოადგება\n\n- პაციენტებს მაღალი არტერიული წნევით\n- გულის რითმის ცვლილებების ეპიზოდების მქონე ადამიანებს\n- მათ, ვისაც სჭირდება მიმდინარე მკურნალობის შეფასება სახლში', 'https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg', 'https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/', '{"კარდიოლოგია","სახლში ვიზიტი","ECG"}', true, timezone('utc', now()) - interval '4 days', '{"how-online-follow-up-works","home-lab-safety-checklist"}'),
  ('70000000-0000-0000-0000-000000000002', '60000000-0000-0000-0000-000000000003', 'how-online-follow-up-works', 'როგორ მუშაობს ონლაინ განმეორებითი კონსულტაცია', 'ონლაინ ვიზიტი საუკეთესოა მაშინ, როდესაც უკვე გაქვთ ანალიზები, წინა დასკვნები ან გჭირდებათ თერაპიის კორექცია სახლიდან გამოსვლის გარეშე.', '## როდის არის ონლაინ ვიზიტი კარგი არჩევანი\n\n- მიმდინარე სიმპტომების განხილვა\n- ანალიზების პასუხების შეფასება\n- მედიკამენტური სქემის გადახედვა', 'https://cdn.pixabay.com/photo/2021/04/10/11/53/telemedicine-6166814_1280.jpg', 'https://pixabay.com/photos/telemedicine-doctor-laptop-6166814/', '{"ონლაინ კონსულტაცია","ვიდეო ვიზიტი"}', true, timezone('utc', now()) - interval '7 days', '{"home-cardiology-ecg-launch"}'),
  ('70000000-0000-0000-0000-000000000003', '60000000-0000-0000-0000-000000000002', 'home-lab-safety-checklist', 'სახლში ლაბორატორიული მომსახურების უსაფრთხო ჩექლისტი', 'ნიმუშის აღებამდე მცირე მომზადება ხელს უწყობს პროცესის სიზუსტესა და პაციენტის კომფორტს.', '## მარტივი წესები\n\n- შეინარჩუნეთ წყლის მიღება\n- მოამზადეთ პირადობის დოკუმენტი\n- დააფიქსირეთ მიმდინარე მედიკამენტები', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', 'https://cdn.pixabay.com/photo/2014/04/04/18/10/laboratory-313864_640.jpg', '{"ლაბორატორია","სახლში მომსახურება"}', true, timezone('utc', now()) - interval '10 days', '{"home-cardiology-ecg-launch"}'),
  ('70000000-0000-0000-0000-000000000004', '60000000-0000-0000-0000-000000000001', 'palliative-support-at-home', 'პალიატიური მზრუნველობა სახლში: რას მოიცავს პროგრამა', 'პროგრამა აერთიანებს სიმპტომურ კონტროლს, ოჯახის მხარდაჭერას და გეგმიურ ვიზიტებს ღირსეული ყოველდღიურობისთვის.', '## პროგრამის საფუძველი\n\nპალიატიური მხარდაჭერა აერთიანებს **სიმპტომების შემცირებას**, ოჯახის მხარდაჭერასა და პროცესის დაგეგმვას.', 'https://cdn.pixabay.com/photo/2026/02/27/16/09/luxurywellness-home-healthcare-10147143_1280.jpg', 'https://pixabay.com/photos/home-healthcare-doctor-home-visit-10147143/', '{"პალიატიური მოვლა","სახლში ვიზიტი"}', true, timezone('utc', now()) - interval '12 days', '{"home-lab-safety-checklist"}')
on conflict (slug) do update
set
  category_id = excluded.category_id,
  title_ka = excluded.title_ka,
  excerpt_ka = excluded.excerpt_ka,
  content_markdown = excluded.content_markdown,
  cover_image_url = excluded.cover_image_url,
  cover_image_credit_url = excluded.cover_image_credit_url,
  tags = excluded.tags,
  is_published = excluded.is_published,
  published_at = excluded.published_at,
  related_slugs = excluded.related_slugs,
  deleted_at = null;

insert into public.testimonials (
  id,
  full_name_ka,
  role_ka,
  quote_ka,
  location_ka,
  rating,
  is_featured,
  sort_order
)
values
  ('80000000-0000-0000-0000-000000000001', 'თამარ მახარაძე', 'პაციენტის ოჯახის წევრი', 'ექიმის და ექთნის ერთ ვიზიტში მოსვლამ ძალიან გაგვიმარტივა პროცესი. კომუნიკაცია მშვიდი, მკაფიო და სწრაფი იყო.', 'თბილისი', 5, true, 1),
  ('80000000-0000-0000-0000-000000000002', 'ლევან ქავთარაძე', 'ონლაინ კონსულტაციის პაციენტი', 'ენდოკრინოლოგთან ონლაინ ვიზიტი პრაქტიკულად და ხარისხიანად ჩაიარა. ანალიზების განხილვაც იმავე დღეს მოვასწარით.', 'რუსთავი', 5, true, 2),
  ('80000000-0000-0000-0000-000000000003', 'ნინო ბერიძე', 'კარდიოლოგიური სერვისის პაციენტი', 'სახლში ECG და კარდიოლოგის შეფასება ერთად ძალიან კომფორტული აღმოჩნდა. ყველაფერი გასაგებად აგვიხსნეს.', 'თბილისი', 5, true, 3)
on conflict (id) do update
set
  full_name_ka = excluded.full_name_ka,
  role_ka = excluded.role_ka,
  quote_ka = excluded.quote_ka,
  location_ka = excluded.location_ka,
  rating = excluded.rating,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order;

insert into public.site_settings (key, value, is_public)
values
  (
    'contact',
    jsonb_build_object(
      'companyName', 'Velora Care',
      'tagline', 'სამედიცინო გუნდი, რომელიც თქვენს სახლსა და ციფრულ არხებს ერთნაირი სიზუსტით ემსახურება.',
      'address', 'თბილისი, ვაჟა-ფშაველას გამზირი 47',
      'email', 'care@velora.ge',
      'phone', '+995 32 2 58 58 58',
      'hours', jsonb_build_array(
        'ორშაბათი - პარასკევი: 09:00 - 21:00',
        'შაბათი - კვირა: 10:00 - 18:00'
      )
    ),
    true
  )
on conflict (key) do update
set
  value = excluded.value,
  is_public = excluded.is_public;

insert into public.availability_slots (
  id,
  doctor_id,
  category,
  service_mode,
  service_id,
  diagnostic_id,
  laboratory_service_id,
  slot_start,
  slot_end,
  capacity,
  status,
  is_public
)
values
  ('90000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'specialty', 'home_visit', '20000000-0000-0000-0000-000000000001', null, null, date_trunc('day', timezone('utc', now())) + interval '1 day 10 hours', date_trunc('day', timezone('utc', now())) + interval '1 day 11 hours', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000002', '50000000-0000-0000-0000-000000000002', 'specialty', 'home_visit', '20000000-0000-0000-0000-000000000002', null, null, date_trunc('day', timezone('utc', now())) + interval '1 day 13 hours', date_trunc('day', timezone('utc', now())) + interval '1 day 14 hours 15 minutes', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000003', '50000000-0000-0000-0000-000000000003', 'specialty', 'online_consultation', '20000000-0000-0000-0000-000000000003', null, null, date_trunc('day', timezone('utc', now())) + interval '2 day 11 hours', date_trunc('day', timezone('utc', now())) + interval '2 day 11 hours 40 minutes', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000004', '50000000-0000-0000-0000-000000000005', 'specialty', 'online_consultation', '20000000-0000-0000-0000-000000000004', null, null, date_trunc('day', timezone('utc', now())) + interval '2 day 17 hours', date_trunc('day', timezone('utc', now())) + interval '2 day 17 hours 40 minutes', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000005', '50000000-0000-0000-0000-000000000004', 'specialty', 'home_visit', '20000000-0000-0000-0000-000000000005', null, null, date_trunc('day', timezone('utc', now())) + interval '3 day 10 hours', date_trunc('day', timezone('utc', now())) + interval '3 day 11 hours 30 minutes', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000006', '50000000-0000-0000-0000-000000000006', 'specialty', 'home_visit', '20000000-0000-0000-0000-000000000006', null, null, date_trunc('day', timezone('utc', now())) + interval '1 day 16 hours', date_trunc('day', timezone('utc', now())) + interval '1 day 16 hours 45 minutes', 2, 'available', true),
  ('90000000-0000-0000-0000-000000000007', null, 'diagnostic', 'home_visit', null, '30000000-0000-0000-0000-000000000002', null, date_trunc('day', timezone('utc', now())) + interval '2 day 9 hours', date_trunc('day', timezone('utc', now())) + interval '2 day 9 hours 30 minutes', 2, 'available', true),
  ('90000000-0000-0000-0000-000000000008', null, 'diagnostic', 'home_visit', null, '30000000-0000-0000-0000-000000000003', null, date_trunc('day', timezone('utc', now())) + interval '3 day 12 hours', date_trunc('day', timezone('utc', now())) + interval '3 day 12 hours 45 minutes', 1, 'available', true),
  ('90000000-0000-0000-0000-000000000009', null, 'laboratory', 'home_visit', null, null, '40000000-0000-0000-0000-000000000002', date_trunc('day', timezone('utc', now())) + interval '1 day 8 hours 30 minutes', date_trunc('day', timezone('utc', now())) + interval '1 day 9 hours', 3, 'available', true),
  ('90000000-0000-0000-0000-000000000010', null, 'laboratory', 'home_visit', null, null, '40000000-0000-0000-0000-000000000001', date_trunc('day', timezone('utc', now())) + interval '2 day 8 hours 30 minutes', date_trunc('day', timezone('utc', now())) + interval '2 day 9 hours', 3, 'available', true)
on conflict (id) do update
set
  doctor_id = excluded.doctor_id,
  category = excluded.category,
  service_mode = excluded.service_mode,
  service_id = excluded.service_id,
  diagnostic_id = excluded.diagnostic_id,
  laboratory_service_id = excluded.laboratory_service_id,
  slot_start = excluded.slot_start,
  slot_end = excluded.slot_end,
  capacity = excluded.capacity,
  status = excluded.status,
  is_public = excluded.is_public,
  deleted_at = null;
