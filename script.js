/* =========================================================================
   ENJO Supplier Meeting-Prep Form
   Bilingual (EN/AR) multi-step intake form.

   SUBMISSION SETUP — read this before going live:
   This form is built to submit straight into a Google Form's built-in
   POST endpoint, so responses land in a connected Google Sheet with zero
   backend. Until you wire it up, submissions just log to the console and
   show the thank-you screen (demo mode) — nothing breaks.

   To connect it to a real Google Sheet:
   1. Create a Google Form with one question per field below (see the
      "label.en" text in FIELD_CONFIG — use the same questions, in the
      same order, same type e.g. checkboxes vs. multiple choice).
   2. Open the live form, right-click → "View Page Source", and search for
      "entry." — copy each question's entry.XXXXXXXXX id.
   3. In the form's URL bar, replace the trailing "/viewform" with
      "/formResponse" — that's your GOOGLE_FORM_ACTION_URL below.
   4. Paste the action URL and each entry id into CONFIG.GOOGLE_FORM below.
   5. In the Form's "Responses" tab, click the Sheets icon to create the
      connected spreadsheet.
   Full walkthrough is also in README.md.
   ========================================================================= */

const CONFIG = {
  GOOGLE_FORM: {
    // Replace with your form's real "/formResponse" URL once created.
    ACTION_URL: "REPLACE_ME_GOOGLE_FORM_ACTION_URL",
    // Map each field name below to its Google Form entry.XXXXXXX id.
    ENTRY_IDS: {
      companyName: "entry.REPLACE_ME",
      website: "entry.REPLACE_ME",
      city: "entry.REPLACE_ME",
      industry: "entry.REPLACE_ME",
      industryOther: "entry.REPLACE_ME",
      yearsOperating: "entry.REPLACE_ME",
      companySize: "entry.REPLACE_ME",
      yearlyRevenue: "entry.REPLACE_ME",
      avgTicket: "entry.REPLACE_ME",
      onlineBooking: "entry.REPLACE_ME",
      description: "entry.REPLACE_ME",
      listedOn: "entry.REPLACE_ME",
      listedOnOther: "entry.REPLACE_ME",
      instagram: "entry.REPLACE_ME",
      pocName: "entry.REPLACE_ME",
      pocTitle: "entry.REPLACE_ME",
      pocEmail: "entry.REPLACE_ME",
      pocPhone: "entry.REPLACE_ME",
      notes: "entry.REPLACE_ME",
      consent: "entry.REPLACE_ME"
    }
  }
};

/* ===== i18n: static UI strings ===== */
const I18N = {
  hero_title: { en: "A few details before we meet", ar: "بضع معلومات قبل ما نلتقي" },
  hero_sub: {
    en: "Help us prepare a focused, useful meeting for your business. Takes about 3 minutes.",
    ar: "ساعدنا نحضّر لقاء مركّز ومفيد لعملكم. بياخد حوالي 3 دقائق."
  },
  hero_point_1: { en: "Helps us prepare specifically for your business", ar: "بساعدنا نحضّر خصيصاً لعملكم" },
  hero_point_2: { en: "About 3 minutes, in short steps", ar: "حوالي 3 دقائق، على خطوات قصيرة" },
  hero_point_3: { en: "Confidential — used only to prepare for our conversation", ar: "سرية بالكامل — تُستخدم فقط لتحضير لقائنا" },
  hero_cta: { en: "Start", ar: "ابدأ" },
  hero_meta: { en: "Questions before you start? emad@enjoapp.com", ar: "عندكم سؤال قبل ما تبدأوا؟ emad@enjoapp.com" },

  nav_back: { en: "Back", ar: "رجوع" },
  nav_next: { en: "Next", ar: "التالي" },
  nav_submit: { en: "Submit", ar: "إرسال" },

  thanks_title: { en: "Got it — thank you", ar: "وصلتنا — شكراً إلكم" },
  thanks_sub: {
    en: "We'll go through this before our meeting so we can make the most of our time together.",
    ar: "رح نراجعها قبل لقائنا عشان نستفيد من وقتنا بأكبر قدر ممكن."
  },
  thanks_signoff: { en: "See you soon — the ENJO team", ar: "منستناكم قريب — فريق إنجو" },

  footer_tagline: { en: "ENJO — Jordan's All-in-One Events & Activities Platform", ar: "إنجو — منصة الأردن الشاملة للفعاليات والأنشطة" },

  select_placeholder: { en: "Select…", ar: "اختر…" },
  optional_tag: { en: "optional", ar: "اختياري" },
  other_label: { en: "Other", ar: "أخرى" },
  other_placeholder: { en: "Please specify", ar: "يرجى التحديد" },
  err_required: { en: "This field is required", ar: "هذا الحقل إلزامي" },
  err_email: { en: "Please enter a valid email address", ar: "يرجى إدخال بريد إلكتروني صحيح" },
  err_select_one: { en: "Please select at least one option", ar: "يرجى اختيار خيار واحد على الأقل" },
  err_consent: { en: "Please confirm to continue", ar: "يرجى التأكيد للمتابعة" },

  step_label: { en: (n, total) => `Step ${n} of ${total}`, ar: (n, total) => `الخطوة ${n} من ${total}` }
};

/* ===== Option lists ===== */
const CITY_OPTIONS = [
  { value: "amman", en: "Amman", ar: "عمّان" },
  { value: "irbid", en: "Irbid", ar: "إربد" },
  { value: "zarqa", en: "Zarqa", ar: "الزرقاء" },
  { value: "aqaba", en: "Aqaba", ar: "العقبة" },
  { value: "madaba", en: "Madaba", ar: "مادبا" },
  { value: "salt", en: "Salt", ar: "السلط" },
  { value: "karak", en: "Karak", ar: "الكرك" },
  { value: "jerash", en: "Jerash", ar: "جرش" },
  { value: "ajloun", en: "Ajloun", ar: "عجلون" },
  { value: "petra", en: "Petra / Wadi Musa", ar: "البتراء / وادي موسى" },
  { value: "wadirum", en: "Wadi Rum", ar: "وادي رم" },
  { value: "deadsea", en: "Dead Sea area", ar: "منطقة البحر الميت" },
  { value: "other", en: "Other", ar: "مدينة أخرى" }
];

const INDUSTRY_OPTIONS = [
  { value: "tourism", en: "Tourism & Travel", ar: "السياحة والسفر" },
  { value: "adventure", en: "Adventure & Outdoor", ar: "المغامرات والأنشطة الخارجية" },
  { value: "sports", en: "Sports & Fitness", ar: "الرياضة واللياقة" },
  { value: "entertainment", en: "Entertainment & Nightlife", ar: "الترفيه والحياة الليلية" },
  { value: "arts", en: "Arts & Culture", ar: "الفنون والثقافة" },
  { value: "fnb", en: "Food & Beverage", ar: "المأكولات والمشروبات" },
  { value: "kids", en: "Kids & Family", ar: "الأطفال والعائلة" },
  { value: "business", en: "Business & Corporate Events", ar: "الفعاليات التجارية والمؤسسية" },
  { value: "wellness", en: "Wellness & Retreats", ar: "العافية والاستجمام" },
  { value: "weddings", en: "Weddings & Celebrations", ar: "الأعراس والمناسبات" },
  { value: "other", en: "Other", ar: "أخرى" }
];

const YEARS_OPTIONS = [
  { value: "lt1", en: "Less than 1 year", ar: "أقل من سنة" },
  { value: "1-3", en: "1–3 years", ar: "1–3 سنوات" },
  { value: "4-7", en: "4–7 years", ar: "4–7 سنوات" },
  { value: "8-15", en: "8–15 years", ar: "8–15 سنة" },
  { value: "15+", en: "15+ years", ar: "أكثر من 15 سنة" }
];

const SIZE_OPTIONS = [
  { value: "1-5", en: "1–5 employees", ar: "1–5 موظفين" },
  { value: "6-15", en: "6–15 employees", ar: "6–15 موظف" },
  { value: "16-50", en: "16–50 employees", ar: "16–50 موظف" },
  { value: "51-100", en: "51–100 employees", ar: "51–100 موظف" },
  { value: "100+", en: "100+ employees", ar: "أكثر من 100 موظف" }
];

const REVENUE_OPTIONS = [
  { value: "lt50k", en: "Under 50,000 JD", ar: "أقل من 50,000 دينار" },
  { value: "50-150k", en: "50,000–150,000 JD", ar: "50,000–150,000 دينار" },
  { value: "150-500k", en: "150,000–500,000 JD", ar: "150,000–500,000 دينار" },
  { value: "500k-1m", en: "500,000–1,000,000 JD", ar: "500,000–1,000,000 دينار" },
  { value: "gt1m", en: "Over 1,000,000 JD", ar: "أكثر من 1,000,000 دينار" },
  { value: "na", en: "Prefer not to say", ar: "أفضّل عدم الإفصاح" }
];

const BOOKING_OPTIONS = [
  { value: "yes", en: "Yes, we take online bookings/payments", ar: "نعم، نستقبل حجوزات ومدفوعات أونلاين" },
  { value: "no", en: "No, not yet", ar: "لا، مش لسا" },
  { value: "planning", en: "Planning to, soon", ar: "بنخطط لهيك قريباً" }
];

const LISTED_OPTIONS = [
  { value: "tripadvisor", en: "TripAdvisor", ar: "TripAdvisor" },
  { value: "getyourguide", en: "GetYourGuide", ar: "GetYourGuide" },
  { value: "viator", en: "Viator", ar: "Viator" },
  { value: "klook", en: "Klook", ar: "Klook" },
  { value: "booking", en: "Booking.com", ar: "Booking.com" },
  { value: "airbnb", en: "Airbnb Experiences", ar: "Airbnb Experiences" },
  { value: "googleonly", en: "Google Business Profile only (no bookings)", ar: "ملف تجاري على غوغل فقط (بدون حجوزات)" },
  { value: "socialonly", en: "Instagram / Facebook only (no booking platform)", ar: "إنستغرام / فيسبوك فقط (بدون منصة حجز)" },
  { value: "dealsites", en: "Deal sites (Cobone, Groupon, etc.)", ar: "مواقع العروض (كوبون، جروبون، إلخ)" },
  { value: "none", en: "Not listed anywhere yet", ar: "غير مدرجين بأي مكان لسا" },
  { value: "other", en: "Other", ar: "أخرى" }
];

/* ===== Step / field configuration ===== */
const STEPS = [
  {
    id: "basics",
    title: { en: "Company basics", ar: "نبذة عن الشركة" },
    subtitle: { en: "The essentials — who you are and what you do", ar: "الأساسيات — مين انتوا وشو بتقدّموا" },
    fields: [
      { name: "companyName", type: "text", mandatory: true,
        label: { en: "Company / business name", ar: "اسم الشركة / النشاط" },
        placeholder: { en: "e.g. Wadi Rum Desert Camp", ar: "مثال: مخيم صحراء وادي رم" } },
      { name: "website", type: "url", mandatory: false,
        label: { en: "Website", ar: "الموقع الإلكتروني" },
        placeholder: { en: "www.yourbusiness.com", ar: "www.yourbusiness.com" },
        helper: { en: "No website yet? Leave it blank.", ar: "ما عندكم موقع لسا؟ اتركوه فاضي." } },
      { name: "city", type: "select", mandatory: true, options: CITY_OPTIONS,
        label: { en: "City / base of operations", ar: "المدينة / مقر العمل" } },
      { name: "industry", type: "chips-multi", mandatory: true, options: INDUSTRY_OPTIONS, otherKey: "industryOther",
        label: { en: "Industry / category", ar: "المجال / الفئة" },
        helper: { en: "Select all that apply", ar: "اختاروا كل ما ينطبق" } }
    ]
  },
  {
    id: "profile",
    title: { en: "Business profile", ar: "الملف التجاري" },
    subtitle: { en: "Helps us understand your scale", ar: "بساعدنا نفهم حجم عملكم" },
    fields: [
      { name: "yearsOperating", type: "chips-single", mandatory: true, options: YEARS_OPTIONS,
        label: { en: "How long have you been operating?", ar: "من متى وانتوا شغالين؟" } },
      { name: "companySize", type: "chips-single", mandatory: true, options: SIZE_OPTIONS,
        label: { en: "Company size", ar: "حجم الشركة" } },
      { name: "yearlyRevenue", type: "chips-single", mandatory: false, options: REVENUE_OPTIONS,
        label: { en: "Yearly revenue (JD)", ar: "الإيرادات السنوية (دينار)" },
        helper: { en: "Confidential — helps us tailor the conversation", ar: "سرية — بتساعدنا نخصص النقاش المناسب" } }
    ]
  },
  {
    id: "offering",
    title: { en: "Your offering", ar: "شو بتقدّموا" },
    subtitle: { en: "The practical details we'll want to discuss", ar: "التفاصيل العملية اللي رح نحكي فيها" },
    fields: [
      { name: "avgTicket", type: "number-suffix", mandatory: true, suffix: { en: "JD", ar: "دينار" },
        label: { en: "Average package / ticket size", ar: "متوسط سعر الباقة / التذكرة" },
        placeholder: { en: "e.g. 35", ar: "مثال: 35" } },
      { name: "onlineBooking", type: "chips-single", mandatory: true, options: BOOKING_OPTIONS,
        label: { en: "Do you currently take online bookings or payments?", ar: "هل تستقبلوا حجوزات أو مدفوعات أونلاين حالياً؟" } },
      { name: "description", type: "textarea", mandatory: false,
        label: { en: "Briefly describe your experience(s) or services", ar: "وصف مختصر لتجاربكم أو خدماتكم" },
        placeholder: { en: "What do you offer, and what makes it worth booking?", ar: "شو بتقدّموا، وشو يميزه؟" } }
    ]
  },
  {
    id: "presence",
    title: { en: "Online presence", ar: "الحضور الإلكتروني" },
    subtitle: { en: "Where are you already listed?", ar: "وين انتوا مدرجين حالياً؟" },
    fields: [
      { name: "listedOn", type: "chips-multi", mandatory: true, options: LISTED_OPTIONS, otherKey: "listedOnOther",
        label: { en: "Currently listed on", ar: "مدرجين حالياً على" },
        helper: { en: "Select all that apply", ar: "اختاروا كل ما ينطبق" } },
      { name: "instagram", type: "text", mandatory: false,
        label: { en: "Instagram / main social handle", ar: "حساب انستغرام / السوشيال الرئيسي" },
        placeholder: { en: "@yourbusiness", ar: "@yourbusiness" } }
    ]
  },
  {
    id: "contact",
    title: { en: "Point of contact", ar: "الشخص المسؤول" },
    subtitle: { en: "Who should we be speaking with?", ar: "مين اللي رح نحكي معه؟" },
    fields: [
      { name: "pocName", type: "text", mandatory: true, label: { en: "Full name", ar: "الاسم الكامل" } },
      { name: "pocTitle", type: "text", mandatory: true,
        label: { en: "Title / role", ar: "المسمى الوظيفي" },
        placeholder: { en: "e.g. Owner, Sales Manager", ar: "مثال: مالك، مدير مبيعات" } },
      { name: "pocEmail", type: "email", mandatory: true, label: { en: "Email", ar: "البريد الإلكتروني" } },
      { name: "pocPhone", type: "tel", mandatory: true,
        label: { en: "Phone number", ar: "رقم الهاتف" },
        placeholder: { en: "07XXXXXXXX", ar: "07XXXXXXXX" } }
    ]
  },
  {
    id: "final",
    title: { en: "Last thing", ar: "الخطوة الأخيرة" },
    subtitle: { en: "Anything else that would help us prepare", ar: "أي شي ثاني بساعدنا نحضّر" },
    fields: [
      { name: "notes", type: "textarea", mandatory: false,
        label: { en: "Anything else you'd like us to know before the meeting?", ar: "في شي حابين تخبرونا فيه قبل اللقاء؟" } },
      { name: "consent", type: "checkbox", mandatory: true,
        label: { en: "I agree that ENJO may contact me regarding this partnership.", ar: "بوافق إنو إنجو يتواصل معي بخصوص هاد التعاون." } }
    ]
  }
];

/* ===== State ===== */
const state = {
  lang: "en",
  stepIndex: 0,
  formData: {}
};

/* ===== Helpers ===== */
function t(key, ...args) {
  const entry = I18N[key];
  if (!entry) return key;
  const val = entry[state.lang];
  return typeof val === "function" ? val(...args) : val;
}

function applyStaticI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });
}

function setLangAttrs() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("lang-ar", state.lang === "ar");
  document.getElementById("langToggle").querySelector(".lang-toggle-label").textContent =
    state.lang === "ar" ? "English" : "العربية";
}

function fieldValue(name) {
  return state.formData[name];
}

function setFieldValue(name, value) {
  state.formData[name] = value;
}

/* ===== Rendering ===== */
function renderStep(index) {
  const step = STEPS[index];
  const container = document.getElementById("stepContainer");
  container.innerHTML = "";

  const titleEl = document.createElement("h2");
  titleEl.className = "step-title";
  titleEl.textContent = step.title[state.lang];
  container.appendChild(titleEl);

  const subEl = document.createElement("p");
  subEl.className = "step-subtitle";
  subEl.textContent = step.subtitle[state.lang];
  container.appendChild(subEl);

  step.fields.forEach(field => {
    container.appendChild(renderField(field));
  });

  document.getElementById("stepLabel").textContent = t("step_label", index + 1, STEPS.length);
  const progressPct = ((index + 1) / STEPS.length) * 100;
  document.getElementById("progressFill").style.width = progressPct + "%";

  document.getElementById("backBtn").classList.toggle("hidden", index === 0);
  const isLast = index === STEPS.length - 1;
  document.getElementById("nextBtn").style.display = isLast ? "none" : "block";
  document.getElementById("submitBtn").style.display = isLast ? "block" : "none";
}

function renderField(field) {
  const wrap = document.createElement("div");
  wrap.className = "field";
  wrap.dataset.field = field.name;

  const label = document.createElement("label");
  label.className = "field-label";
  label.textContent = field.label[state.lang];
  if (field.mandatory) {
    const req = document.createElement("span");
    req.className = "req";
    req.textContent = "*";
    label.appendChild(req);
  } else {
    const opt = document.createElement("span");
    opt.className = "opt";
    opt.textContent = "(" + t("optional_tag") + ")";
    label.appendChild(opt);
  }
  wrap.appendChild(label);

  const current = fieldValue(field.name);

  if (["text", "email", "tel", "url"].includes(field.type)) {
    const input = document.createElement("input");
    input.type = field.type;
    input.placeholder = (field.placeholder && field.placeholder[state.lang]) || "";
    input.value = current || "";
    input.addEventListener("input", () => setFieldValue(field.name, input.value.trim()));
    wrap.appendChild(input);

  } else if (field.type === "number-suffix") {
    const holder = document.createElement("div");
    holder.className = "input-with-suffix";
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.placeholder = (field.placeholder && field.placeholder[state.lang]) || "";
    input.value = current || "";
    input.addEventListener("input", () => setFieldValue(field.name, input.value.trim()));
    const suffix = document.createElement("span");
    suffix.className = "input-suffix";
    suffix.textContent = field.suffix[state.lang];
    holder.appendChild(input);
    holder.appendChild(suffix);
    wrap.appendChild(holder);

  } else if (field.type === "textarea") {
    const textarea = document.createElement("textarea");
    textarea.placeholder = (field.placeholder && field.placeholder[state.lang]) || "";
    textarea.value = current || "";
    textarea.addEventListener("input", () => setFieldValue(field.name, textarea.value.trim()));
    wrap.appendChild(textarea);

  } else if (field.type === "select") {
    const select = document.createElement("select");
    const placeholderOpt = document.createElement("option");
    placeholderOpt.value = "";
    placeholderOpt.textContent = t("select_placeholder");
    placeholderOpt.disabled = true;
    placeholderOpt.selected = !current;
    select.appendChild(placeholderOpt);
    field.options.forEach(opt => {
      const optEl = document.createElement("option");
      optEl.value = opt.value;
      optEl.textContent = opt[state.lang];
      if (current === opt.value) optEl.selected = true;
      select.appendChild(optEl);
    });
    select.addEventListener("change", () => setFieldValue(field.name, select.value));
    wrap.appendChild(select);

  } else if (field.type === "chips-single") {
    const group = document.createElement("div");
    group.className = "chip-group";
    field.options.forEach(opt => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (current === opt.value ? " selected" : "");
      chip.textContent = opt[state.lang];
      chip.addEventListener("click", () => {
        setFieldValue(field.name, opt.value);
        group.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
        chip.classList.add("selected");
        clearError(wrap);
      });
      group.appendChild(chip);
    });
    wrap.appendChild(group);

  } else if (field.type === "chips-multi") {
    const group = document.createElement("div");
    group.className = "chip-group";
    const selectedValues = new Set(current || []);
    const otherWrap = document.createElement("div");
    otherWrap.className = "other-input";

    const otherInput = document.createElement("input");
    otherInput.type = "text";
    otherInput.placeholder = t("other_placeholder");
    otherInput.value = (field.otherKey && fieldValue(field.otherKey)) || "";
    otherInput.addEventListener("input", () => setFieldValue(field.otherKey, otherInput.value.trim()));
    otherWrap.appendChild(otherInput);

    field.options.forEach(opt => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (selectedValues.has(opt.value) ? " selected" : "");
      chip.textContent = opt[state.lang];
      chip.addEventListener("click", () => {
        if (selectedValues.has(opt.value)) {
          selectedValues.delete(opt.value);
          chip.classList.remove("selected");
        } else {
          selectedValues.add(opt.value);
          chip.classList.add("selected");
        }
        setFieldValue(field.name, Array.from(selectedValues));
        if (opt.value === "other" && field.otherKey) {
          otherWrap.classList.toggle("visible", selectedValues.has("other"));
        }
        clearError(wrap);
      });
      group.appendChild(chip);
    });
    wrap.appendChild(group);
    if (field.otherKey) {
      otherWrap.classList.toggle("visible", selectedValues.has("other"));
      wrap.appendChild(otherWrap);
    }

  } else if (field.type === "checkbox") {
    const row = document.createElement("div");
    row.className = "consent-row";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = "field-" + field.name;
    input.checked = !!current;
    input.addEventListener("change", () => {
      setFieldValue(field.name, input.checked);
      clearError(wrap);
    });
    const lbl = document.createElement("label");
    lbl.setAttribute("for", input.id);
    lbl.textContent = field.label[state.lang];
    row.appendChild(input);
    row.appendChild(lbl);
    wrap.removeChild(label); // consent renders its own inline label
    wrap.appendChild(row);
  }

  if (field.helper) {
    const helperEl = document.createElement("p");
    helperEl.className = "field-helper";
    helperEl.textContent = field.helper[state.lang];
    wrap.appendChild(helperEl);
  }

  const errorEl = document.createElement("p");
  errorEl.className = "field-error";
  wrap.appendChild(errorEl);

  return wrap;
}

function clearError(wrap) {
  wrap.classList.remove("invalid");
}

function showError(wrap, message) {
  wrap.classList.add("invalid");
  wrap.querySelector(".field-error").textContent = message;
}

/* ===== Validation ===== */
function validateStep(index) {
  const step = STEPS[index];
  let valid = true;

  step.fields.forEach(field => {
    if (!field.mandatory) return;
    const wrap = document.querySelector(`[data-field="${field.name}"]`);
    const value = fieldValue(field.name);

    let fieldValid = true;
    let message = t("err_required");

    if (field.type === "chips-multi") {
      fieldValid = Array.isArray(value) && value.length > 0;
      message = t("err_select_one");
    } else if (field.type === "checkbox") {
      fieldValid = value === true;
      message = t("err_consent");
    } else if (field.type === "email") {
      fieldValid = !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      message = value ? t("err_email") : t("err_required");
    } else {
      fieldValid = value !== undefined && value !== null && String(value).trim() !== "";
    }

    if (!fieldValid) {
      valid = false;
      showError(wrap, message);
    } else {
      clearError(wrap);
    }
  });

  return valid;
}

/* ===== Submission ===== */
function buildGoogleFormBody() {
  const params = new URLSearchParams();
  const ids = CONFIG.GOOGLE_FORM.ENTRY_IDS;

  Object.keys(ids).forEach(fieldName => {
    const entryId = ids[fieldName];
    const value = state.formData[fieldName];
    if (value === undefined || value === null || value === "") return;

    if (Array.isArray(value)) {
      value.forEach(v => params.append(entryId, v));
    } else {
      params.append(entryId, String(value));
    }
  });

  return params;
}

function submitForm() {
  const actionUrl = CONFIG.GOOGLE_FORM.ACTION_URL;
  const isDemoMode = !actionUrl || actionUrl.includes("REPLACE_ME");

  if (isDemoMode) {
    console.info("[ENJO Supplier Form] Demo mode — no Google Form connected yet. Submitted data:", state.formData);
    goToThanks();
    return;
  }

  const body = buildGoogleFormBody();
  fetch(actionUrl, { method: "POST", mode: "no-cors", body })
    .catch(err => console.warn("[ENJO Supplier Form] Submission request error (Google Forms opaque response is expected):", err))
    .finally(goToThanks);
}

/* ===== Screen transitions ===== */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function goToThanks() {
  applyStaticI18n();
  showScreen("thanks");
}

/* ===== Init / events ===== */
function init() {
  setLangAttrs();
  applyStaticI18n();

  document.getElementById("langToggle").addEventListener("click", () => {
    state.lang = state.lang === "en" ? "ar" : "en";
    setLangAttrs();
    applyStaticI18n();
    if (document.getElementById("wizard").classList.contains("active")) {
      renderStep(state.stepIndex);
    }
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    state.stepIndex = 0;
    renderStep(0);
    showScreen("wizard");
  });

  document.getElementById("backBtn").addEventListener("click", () => {
    if (state.stepIndex === 0) return;
    state.stepIndex -= 1;
    renderStep(state.stepIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    if (!validateStep(state.stepIndex)) return;
    state.stepIndex += 1;
    renderStep(state.stepIndex);
  });

  document.getElementById("supplierForm").addEventListener("submit", e => {
    e.preventDefault();
    if (!validateStep(state.stepIndex)) return;
    submitForm();
  });
}

document.addEventListener("DOMContentLoaded", init);
