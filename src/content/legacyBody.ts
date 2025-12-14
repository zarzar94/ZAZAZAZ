export const LEGACY_BODY_HTML = `
<div class="scroll-progress" aria-hidden="true"><div id="scrollProgressBar"></div></div>
    <nav class="navbar" id="navbar"><div class="navbar-content"><a href="#" class="logo"><div class="logo-icon"><img src="assets/images/brain_icon_44.png" alt="Berard AIT" /></div><span>Bérard AIT</span></a><div class="nav-links">
                <a href="#about">عن البرنامج</a>
                <a href="#program">الخطة (10 أيام)</a>
                <a href="#apd">ما هو APD؟</a>
                <a href="#schools">للمدارس</a>
                <a href="#pptx">العرض</a>
                <a href="#games">🎮 التجارب</a>
                <a href="#checklist">Checklist</a>
                <a href="#practitioner">المشرف</a>
                <a href="#faq">الأسئلة</a>
                <a href="#contact">تواصل</a>
                <button class="icon-btn" id="themeToggle" title="الوضع الليلي" aria-label="الوضع الليلي">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
                </button>
                <a href="#" class="nav-cta" onclick="openGameSelector();return false;">ابدأ التقييم</a>
            </div></div></nav>

    <section class="hero"><div class="hero-bg"><div class="hero-gradient"></div></div><div class="hero-content"><div class="hero-text"><h1><span>تدريب الدماغ...</span><br>ليفهم ما تسمعه الأذن</h1><p>برنامج Bérard AIT المكثف لمدة 10 أيام — ضمن بيئة Lotus Holistic Centre في أبوظبي — لدعم التركيز والمعالجة السمعية والسلوك، بالتعاون مع المدرسة والأسرة.</p><div class="hero-buttons"><button class="btn btn-primary" onclick="openGameSelector()">ابدأ التقييم الآن</button><button class="btn btn-secondary" onclick="openGameSelector()">🎮 جرّب التجارب التفاعلية</button></div></div><div class="hero-visual"><div class="audiogram"><div class="audiogram-circle"></div><div class="audiogram-circle"></div><div class="audiogram-circle"></div><div class="audiogram-circle"></div><div class="audiogram-icon"><svg viewBox="0 0 24 24"><path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/></svg></div></div></div></div></section>

    <section class="stats-bar"><div class="stats-content"><div class="stat-item"><div class="stat-number">+2000</div><div class="stat-label">طفل استفاد من البرنامج</div></div><div class="stat-item"><div class="stat-number">85%</div><div class="stat-label">نسبة التحسن في التركيز</div></div><div class="stat-item"><div class="stat-number">10</div><div class="stat-label">أيام فقط للبرنامج</div></div><div class="stat-item"><div class="stat-number">40+</div><div class="stat-label">سنة من الخبرة العالمية</div></div></div></section>


    <!-- Deck Preview (Home hook) -->
    <section class="content-section" id="deck-preview" style="padding:4.5rem 2rem;background:var(--bg-primary);border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
        <div class="section-header" style="margin-bottom:2.25rem">
            <span class="section-tag">عرض سريع</span>
            <h2 class="section-title">لمحة من العرض التقديمي (1:1)</h2>
            <p class="section-desc">صور حقيقية من الشرائح — مفيدة للأهالي، ومثالية لعروض الشراكة مع المدارس.</p>
        </div>

        <div class="pptx-grid" style="grid-template-columns:repeat(6,1fr);gap:.85rem">
            <div class="pptx-thumb" onclick="openSlideViewer(1)"><img src="assets/pptx_slides/thumbs/thumb-01.jpg" alt="Slide 1" loading="lazy"><div class="pptx-cap">1 <span>مقدمة</span></div></div>
            <div class="pptx-thumb" onclick="openSlideViewer(6)"><img src="assets/pptx_slides/thumbs/thumb-06.jpg" alt="Slide 6" loading="lazy"><div class="pptx-cap">6 <span>لماذا</span></div></div>
            <div class="pptx-thumb" onclick="openSlideViewer(10)"><img src="assets/pptx_slides/thumbs/thumb-10.jpg" alt="Slide 10" loading="lazy"><div class="pptx-cap">10 <span>تحسنات</span></div></div>
            <div class="pptx-thumb" onclick="openSlideViewer(14)"><img src="assets/pptx_slides/thumbs/thumb-14.jpg" alt="Slide 14" loading="lazy"><div class="pptx-cap">14 <span>حساسية</span></div></div>
            <div class="pptx-thumb" onclick="openSlideViewer(42)"><img src="assets/pptx_slides/thumbs/thumb-42.jpg" alt="Slide 42" loading="lazy"><div class="pptx-cap">42 <span>قبل/بعد</span></div></div>
            <div class="pptx-thumb" onclick="openSlideViewer(55)"><img src="assets/pptx_slides/thumbs/thumb-55.jpg" alt="Slide 55" loading="lazy"><div class="pptx-cap">55 <span>خلاصة</span></div></div>
        </div>

        <div style="max-width:1200px;margin:1.5rem auto 0;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
            <a class="btn btn-primary" href="#pptx">📚 مشاهدة كل الشرائح</a>
            <a class="btn btn-secondary" href="#games">🎮 جرّب الألعاب</a>
        </div>
    </section>




    
    <!-- About Section -->
    <section class="content-section" id="about">
        <div class="section-header">
            <span class="section-tag">عن البرنامج</span>
            <h2 class="section-title">برنامج بيرارد للتكامل السمعي (Bérard AIT)</h2>
            <p class="section-desc">برنامج تأهيلي مكثّف يعتمد على جلسات استماع بموسيقى مُعدّلة الترددات بهدف دعم طريقة معالجة الدماغ للصوت.</p>
        </div>
        <div class="content-wrap">
            <div class="card">
                <h3>الفكرة الأساسية</h3>
                <p><strong>السمع = السلوك</strong> — كل ما يصدر عن البشر من سلوك يرتبط بشكل كبير بالطريقة التي يسمعون بها (د. بيرارد).</p>
                <p>عند وجود اضطراب في معالجة الصوت (APD)، قد يواجه الطفل صعوبة في التركيز واتباع التعليمات في بيئات مليئة بالضوضاء.</p>
                <ul class="bullets">
                    <li>تحسين القدرة على القراءة والكتابة والحفظ</li>
                    <li>تحسين الاستجابة للتعليمات والبرامج التدريبية</li>
                    <li>تقليل فرط الحركة والسلوكيات غير المرغوبة</li>
                    <li>تقليل المشاكل الحسية المصاحبة للتوحد</li>
                    <li>زيادة الانتباه والتركيز</li>
                    <li>تخفيف أعراض القلق واضطرابات النوم والاكتئاب</li>
                </ul>
            </div>
            <div class="card">
                <h3>مؤشرات رقمية (حسب مواد البرنامج)</h3>
                <div class="mini-grid">
                    <div class="mini"><strong>20 جلسة</strong><span>خلال 10–12 يوماً</span></div>
                    <div class="mini"><strong>30 دقيقة</strong><span>مدة كل جلسة</span></div>
                    <div class="mini"><strong>≥ 3 ساعات</strong><span>فاصل بين الجلستين</span></div>
                </div>
                <div class="mini-grid" style="margin-top:1rem">
                    <div class="mini"><strong>قبل البدء</strong><span>فحص سمع خاص بالبرنامج</span></div>
                    <div class="mini"><strong>بعد 10 جلسات</strong><span>مراجعة/قياس تقدّم</span></div>
                    <div class="mini"><strong>بعد النهاية</strong><span>قياس نهائي</span></div>
                </div>
                <p style="margin-top:1rem">يتم الاستماع عبر سماعات الرأس باستخدام جهاز <strong>EARDUCATOR</strong> لتنقية الترددات ضمن نطاق واسع من الموسيقى.</p>
            </div>
        </div>
    </section>

    <!-- 10-Day Program Section -->
    <section class="content-section" id="program" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">الخطة</span>
            <h2 class="section-title">كيف يعمل البرنامج خلال 10–12 يوماً؟</h2>
            <p class="section-desc">مسار واضح للعائلة والمدرسة — مع متطلبات زمنية بسيطة وجلسات قصيرة.</p>
        </div>
        <div style="max-width:1200px;margin:0 auto">
            <div class="timeline">
                <div class="step">
                    <div class="k">المرحلة 1</div>
                    <div class="t">تقييم وفحص سمع خاص</div>
                    <div class="d">قياس مبدئي لتحديد الترددات التي قد تؤثر على الانتباه والمعالجة السمعية.</div>
                </div>
                <div class="step">
                    <div class="k">المرحلة 2</div>
                    <div class="t">جلسات الاستماع (2 يومياً)</div>
                    <div class="d">جلستان يومياً، 30 دقيقة لكل جلسة، مع فاصل 3 ساعات على الأقل.</div>
                </div>
                <div class="step">
                    <div class="k">المرحلة 3</div>
                    <div class="t">مراجعة بعد 10 جلسات</div>
                    <div class="d">مقارنة مبدئية ورصد أي تغيّر في الانتباه/التركيز ومنحنى السمع.</div>
                </div>
                <div class="step">
                    <div class="k">المرحلة 4</div>
                    <div class="t">إكمال 20 جلسة</div>
                    <div class="d">استكمال التدريب بموسيقى ذات ترددات واسعة ومتغيرة ومنقّاة.</div>
                </div>
                <div class="step">
                    <div class="k">المرحلة 5</div>
                    <div class="t">قياس نهائي + توصيات</div>
                    <div class="d">قياس بعد نهاية البرنامج + توصيات موجهة للبيت والمدرسة (بموافقة ولي الأمر).</div>
                </div>
                <div class="step">
                    <div class="k">المرحلة 6</div>
                    <div class="t">متابعة</div>
                    <div class="d">متابعة قصيرة للتحقق من التقدم وربطه بسلوك الصف والتعلم.</div>
                </div>
            </div>
            <div style="text-align:center;margin-top:2rem">
                <button class="btn btn-primary" onclick="openGameSelector()">🎮 جرّب التجارب التفاعلية</button>
                <button class="btn btn-secondary" onclick="openBooking()">📅 احجز تقييماً</button>
            </div>
        </div>
    </section>

    <!-- APD Section -->
    <section class="content-section" id="apd">
        <div class="section-header">
            <span class="section-tag">APD</span>
            <h2 class="section-title">ما هو اضطراب المعالجة السمعية (APD/CAPD)؟</h2>
            <p class="section-desc">عجز في المعالجة العصبية للمعلومات السمعية في الجهاز العصبي المركزي وليس بسبب ضعف السمع.</p>
        </div>
        <div class="content-wrap">
            <div class="card">
                <h3>تعريف مختصر (ASHA 2005)</h3>
                <p>يشير اضطراب المعالجة السمعية المركزية (CAPD) إلى العجز في المعالجة العصبية للمعلومات السمعية في الجهاز العصبي المركزي، ويظهر ذلك في ضعف الأداء في مهارات اللغة والتعلم والتواصل.</p>
                <div class="mini-grid" style="grid-template-columns:repeat(2,1fr)">
                    <div class="mini"><strong>APD & ADHD</strong><span>تحدث الحالة مع أعراض فرط الحركة وتشتت الانتباه بنسبة 41% إلى 83% (حسب مواد العرض).</span></div>
                    <div class="mini"><strong>صعوبات التعلم</strong><span>Dyslexia / Dysgraphia / Dyscalculia قد ترتبط بصعوبات التكامل السمعي.</span></div>
                </div>
            </div>
            <div class="card">
                <h3>لماذا يساعد التكامل السمعي؟</h3>
                <p>عند وجود تدرّج/تعّرج في منحنى السمع الخاص بالبرنامج، قد لا يستقبل الدماغ الترددات بشكل متناسق، مما يؤثر سلباً على الانتباه والتركيز. بعد جلسات التكامل السمعي قد نلاحظ انتظاماً في المنحنى وتحسناً في الانتباه والتركيز.</p>
                <p class="hint">تنويه: المحتوى توعوي ولا يغني عن التقييم المهني.</p>
            </div>
        </div>
    </section>

    <!-- Comparison Section -->
    <section class="content-section" id="comparison" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">مقارنة</span>
            <h2 class="section-title">بيرارد AIT مقابل البدائل الشائعة (Tomatis / iLS / SSP)</h2>
            <p class="section-desc">مقارنة توعوية لمساعدة الأهالي والمدارس على فهم الفروقات. ليست نصيحة طبية، والاختيار النهائي يعتمد على تقييم مهني واحتياج الطفل.</p>
        </div>

        <div style="max-width:1200px;margin:0 auto">
            <div class="card" style="overflow:auto">
                <table style="width:100%;border-collapse:separate;border-spacing:0 10px;min-width:980px">
                    <thead>
                        <tr>
                            <th style="text-align:right;padding:10px 12px;color:var(--text-muted);font-weight:900">المعيار</th>
                            <th style="text-align:right;padding:10px 12px;color:var(--primary);font-weight:900">Bérard AIT</th>
                            <th style="text-align:right;padding:10px 12px;color:var(--text-primary);font-weight:900">Tomatis</th>
                            <th style="text-align:right;padding:10px 12px;color:var(--text-primary);font-weight:900">iLS</th>
                            <th style="text-align:right;padding:10px 12px;color:var(--text-primary);font-weight:900">SSP</th>
                            <th style="text-align:right;padding:10px 12px;color:var(--text-primary);font-weight:900">استماع عام</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background:var(--bg-tertiary);border-radius:14px">
                            <td style="padding:12px;font-weight:900;border-radius:14px">المدة</td>
                            <td style="padding:12px">10–12 يومًا (20 جلسة)</td>
                            <td style="padding:12px">عادةً دورات/مراحل تمتد أسابيع–أشهر</td>
                            <td style="padding:12px">برنامج منزلي/عيادي على عدة أسابيع</td>
                            <td style="padding:12px">5 أيام (عادةً ساعة/يوم)</td>
                            <td style="padding:12px">مرن — حسب الخطة</td>
                        </tr>
                        <tr style="background:#fff;border:1px solid var(--border)">
                            <td style="padding:12px;font-weight:900;border-radius:14px">المنهجية</td>
                            <td style="padding:12px">موسيقى مُعدّلة الترددات بتبديل سريع (تحت إشراف ممارس معتمد)</td>
                            <td style="padding:12px">موسيقى/صوت + آليات فلترة (قد تشمل تدريب صوتي)</td>
                            <td style="padding:12px">استماع + تمارين (أحياناً دمج حسي/حركي)</td>
                            <td style="padding:12px">موسيقى مُفلترة للتهدئة والتنظيم العصبي</td>
                            <td style="padding:12px">محتوى صوتي عام/تأهيلي بدون بروتوكول قياسي</td>
                        </tr>
                        <tr style="background:var(--bg-tertiary)">
                            <td style="padding:12px;font-weight:900;border-radius:14px">الأجهزة</td>
                            <td style="padding:12px">جهاز AIT (مثل Earducator) + سماعات</td>
                            <td style="padding:12px">جهاز Tomatis / سماعات خاصة</td>
                            <td style="padding:12px">مُشغّل + سماعات (قد تشمل توصيل عظمي)</td>
                            <td style="padding:12px">تطبيق + سماعات</td>
                            <td style="padding:12px">سماعات عامة</td>
                        </tr>
                        <tr style="background:#fff;border:1px solid var(--border)">
                            <td style="padding:12px;font-weight:900;border-radius:14px">الأفضل لـ</td>
                            <td style="padding:12px">APD / فرط حساسية السمع / الانتباه السمعي / تشتت الصف</td>
                            <td style="padding:12px">الاستماع واللغة والتواصل (حسب الحالة)</td>
                            <td style="padding:12px">الانتباه + تنظيم حسي/حركي (حسب الحالة)</td>
                            <td style="padding:12px">التنظيم العصبي/القلق/الاندماج الاجتماعي</td>
                            <td style="padding:12px">دعم عام أو مكمل (ليس بديلاً للتقييم)</td>
                        </tr>
                        <tr style="background:var(--bg-tertiary)">
                            <td style="padding:12px;font-weight:900;border-radius:14px">التوفر داخل الإمارات</td>
                            <td style="padding:12px">يتوفر عبر مراكز محددة/ممارسين معتمدين (أبوظبي)</td>
                            <td style="padding:12px">قد يتوفر عبر مراكز محدودة</td>
                            <td style="padding:12px">قد يتوفر عبر معالجين/برامج منزلية</td>
                            <td style="padding:12px">قد يتوفر عبر مزودين/تدريب عن بُعد</td>
                            <td style="padding:12px">متاح للجميع</td>
                        </tr>
                    </tbody>
                </table>
                <p class="hint" style="margin-top:1rem">ملاحظة: المقارنة للتوعية وليست للحكم على فعالية أي برنامج. ننصح دائمًا بالتقييم المهني وخطة تناسب الطفل والمدرسة.</p>
            </div>
        </div>
    </section>




    <!-- Practitioner Section -->
    <section class="content-section" id="practitioner" style="background:var(--bg-primary)">
        <div class="section-header">
            <span class="section-tag">الاختصاصي</span>
            <h2 class="section-title">بإشراف الأخصائي/ محمد عرفة</h2>
            <p class="section-desc">ممارس معتمد – لندن 2012 • رقم الاعتماد: PA21213 • أبوظبي</p>
        </div>
        <div class="content-wrap">
            <div class="card">
                <h3>الخبرات</h3>
                <ul class="bullets">
                    <li>عضو فريق التشخيص – الجمعية السعودية للتوحد سابقاً</li>
                    <li>مشرف على برامج التخاطب – وزارة الشؤون الاجتماعية السعودية سابقاً</li>
                    <li>دراسات صوتية – جامعة الإسكندرية 1987</li>
                </ul>
                <p class="hint">يمكن التأكد من اعتماد الممارس عبر الموقع الرسمي BAITIS.</p>
            </div>
            <div class="card">
                <h3>الجهاز المستخدم</h3>
                <p>يتم تنفيذ الجلسات عبر جهاز <strong>EARDUCATOR</strong> لتنقية الترددات الصوتية بهدف تدريب الدماغ على استقبالها بشكل متناغم ومعالجتها بطريقة أفضل.</p>
                <div class="mini-grid" style="grid-template-columns:repeat(2,1fr)">
                    <div class="mini"><strong>جلسات داخل المركز</strong><span>تحت إشراف ممارس معتمد</span></div>
                    <div class="mini"><strong>ليس CD</strong><span>لا تُجرى عبر أقراص أو طرق غير معتمدة</span></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Important Notes -->
    <section class="content-section" id="notes" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">هام</span>
            <h2 class="section-title">تعليمات مهمة قبل/أثناء/بعد الجلسات</h2>
            <p class="section-desc">معلومات تشغيلية لضمان أفضل تجربة ولتقليل أي تأثيرات سلبية على النتائج.</p>
        </div>
        <div style="max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem">
            <div class="step">
                <div class="k">بعد الجلسات</div>
                <div class="t">تجنب السماعات</div>
                <div class="d">ينبغي تجنب سماعات الرأس/الأذن بعد إجراء الجلسات لأنها قد تسبب تراجعاً في النتائج.</div>
            </div>
            <div class="step">
                <div class="k">أدوية</div>
                <div class="t">تنبيه على أدوية السمع</div>
                <div class="d">هناك أدوية قد يكون لها تأثير سلبي على السمع بشكل عام وعلى التكامل السمعي بشكل خاص — ناقش ذلك مع الفريق.</div>
            </div>
            <div class="step">
                <div class="k">التنفيذ</div>
                <div class="t">داخل المركز فقط</div>
                <div class="d">الجلسات يجب أن تتم في المركز بواسطة الجهاز المخصص وتحت إشراف الممارس المعتمد.</div>
            </div>
        </div>
    </section>

    <!-- Expected Results + Temporary Effects -->
    <section class="content-section" id="results">
        <div class="section-header">
            <span class="section-tag">النتائج</span>
            <h2 class="section-title">نتائج متوقعة + أعراض مؤقتة</h2>
            <p class="section-desc">تظهر النتائج خلال أيام/أسابيع/شهور وبشكل متفاوت من شخص لآخر.</p>
        </div>
        <div class="content-wrap">
            <div class="card">
                <h3>تحسنات قد تظهر</h3>
                <ul class="bullets">
                    <li>تحسن الانتباه والتركيز والتواصل البصري</li>
                    <li>تقليد أصوات وظهور كلمات جديدة</li>
                    <li>تحسن في مهارات العناية الذاتية</li>
                    <li>انتظام النوم والابتعاد عن النمطية في الأكل</li>
                    <li>تطور في مهارات التواصل الاجتماعي واللعب</li>
                    <li>تحسن في أداء المهارات الحركية الدقيقة</li>
                </ul>
            </div>
            <div class="card">
                <h3>أعراض مؤقتة (قد تظهر)</h3>
                <ul class="bullets">
                    <li>نشاط زائد عن المعتاد</li>
                    <li>الشعور بالإرهاق والرغبة في النوم</li>
                    <li>التمرد على الأوضاع المعتادة</li>
                </ul>
                <p class="hint">عادةً لا تستمر هذه الأعراض لفترة طويلة، وقد تكون مؤشراً لاستجابة الدماغ لهذا النوع من التدريب.</p>
            </div>
        </div>
    
        <div style="max-width:1200px;margin:2.5rem auto 0">
            <div class="section-header" style="margin-bottom:2rem">
                <span class="section-tag">حالات قبل/بعد</span>
                <h2 class="section-title" style="font-size:1.6rem">أمثلة بصرية من ملفات البرنامج (قبل / بعد)</h2>
                <p class="section-desc">اضغط على أي صورة لعرض الشريحة بالحجم الكامل.</p>
            </div>

            <div class="pptx-grid" style="grid-template-columns:repeat(5,1fr);gap:.85rem">
                <div class="pptx-thumb" onclick="openSlideViewer(42)"><img src="assets/pptx_slides/thumbs/thumb-42.jpg" alt="Slide 42" loading="lazy"/><div class="pptx-cap">شريحة 42 <span>قبل/بعد</span></div></div>
                <div class="pptx-thumb" onclick="openSlideViewer(43)"><img src="assets/pptx_slides/thumbs/thumb-43.jpg" alt="Slide 43" loading="lazy"/><div class="pptx-cap">شريحة 43 <span>قبل/بعد</span></div></div>
                <div class="pptx-thumb" onclick="openSlideViewer(44)"><img src="assets/pptx_slides/thumbs/thumb-44.jpg" alt="Slide 44" loading="lazy"/><div class="pptx-cap">شريحة 44 <span>قبل/بعد</span></div></div>
                <div class="pptx-thumb" onclick="openSlideViewer(45)"><img src="assets/pptx_slides/thumbs/thumb-45.jpg" alt="Slide 45" loading="lazy"/><div class="pptx-cap">شريحة 45 <span>قبل/بعد</span></div></div>
                <div class="pptx-thumb" onclick="openSlideViewer(46)"><img src="assets/pptx_slides/thumbs/thumb-46.jpg" alt="Slide 46" loading="lazy"/><div class="pptx-cap">شريحة 46 <span>قبل/بعد</span></div></div>
            </div>
        </div>

    </section>

    <!-- Interactive Checklist -->
    <section class="content-section" id="checklist" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">Checklist</span>
            <h2 class="section-title">قائمة تحقق: هل من المحتمل أن يُحدث AIT فرقاً؟</h2>
            <p class="section-desc">استخدم قائمة التحقق لمعرفة ما إذا كان من المحتمل أن يحدث البرنامج فرقاً (قد تظهر التحسينات كمنتج ثانوي).</p>
        </div>

        <div class="content-wrap">
            <div class="card">
                <h3>اختر ما ينطبق</h3>
                <p class="hint">هذه القائمة توعوية وليست تشخيصاً. بعد الاختيار ستحصل على توصية أولية للخطوة التالية.</p>

                <div class="mini-grid" style="grid-template-columns:repeat(2,1fr)">
                    <div class="mini"><strong>صعوبات التعلم</strong><span>قراءة/كتابة/تهجئة/حفظ</span></div>
                    <div class="mini"><strong>تمييز الأصوات</strong><span>ضعف تمييز/فرط حساسية/سمع مؤلم/طنين</span></div>
                    <div class="mini"><strong>الانتباه والسلوك</strong><span>ضعف تركيز/فرط نشاط/سلوكيات صعبة</span></div>
                    <div class="mini"><strong>مزاج وقلق</strong><span>قلق/هلع/اكتئاب/إجهاد</span></div>
                </div>

                <div style="margin-top:1.2rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
                    <div class="mini">
                        <label><input type="checkbox" class="clItem"> صعوبات القراءة</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبات الكتابة</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبات التهجئة</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبات اللغة/الكلام/التأتأة</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبة النطق/ضعف تمييز الأصوات</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبات التعلم/ضعف الذاكرة</label><br>
                        <label><input type="checkbox" class="clItem"> ضعف التنظيم/تنظيم الأفكار</label><br>
                        <label><input type="checkbox" class="clItem"> صعوبة اتباع تعليمات متعددة الخطوات</label><br>
                    </div>
                    <div class="mini">
                        <label><input type="checkbox" class="clItem"> فرط حساسية السمع/السمع المؤلم</label><br>
                        <label><input type="checkbox" class="clItem"> طنين الأذن</label><br>
                        <label><input type="checkbox" class="clItem"> مشاكل التوازن والتنسيق/مشاكل حركية</label><br>
                        <label><input type="checkbox" class="clItem"> السلوكيات الصعبة/فرط النشاط</label><br>
                        <label><input type="checkbox" class="clItem"> القلق/نوبات الهلع</label><br>
                        <label><input type="checkbox" class="clItem"> الاكتئاب/الإجهاد والتوتر</label><br>
                        <label><input type="checkbox" class="clItem"> اضطرابات طيف التوحد/ADD/ADHD/CAPD</label><br>
                        <label><input type="checkbox" class="clItem"> خلل التكامل الحسي/تأخر نمائي</label><br>
                    </div>
                </div>

                <div style="margin-top:1rem" class="pill-note">
                    <strong>نتيجتك:</strong> <span id="clCount">0</span> بنداً محدداً
                    <div class="mini-muted" id="clAdvice" style="margin-top:.25rem">اختر البنود للحصول على توصية أولية.</div>
                </div>

                <div class="game-controls" style="margin-top:1rem">
                    <button class="btn btn-primary" onclick="openBooking()">📅 احجز تقييمًا مبدئيًا</button>
                    <button class="btn btn-secondary" onclick="openGameSelector()">🎮 جرّب الألعاب التفاعلية</button>
                    <a class="btn btn-secondary" href="Check list (2).pdf" target="_blank" rel="noopener">⬇️ تحميل PDF</a>
                </div>
            </div>

            <div class="card">
                <h3>كيف نستخدمها عملياً؟</h3>
                <ul class="bullets">
                    <li>إذا كانت البنود كثيرة أو مرتبطة بالصف والمدرسة → التقييم المبدئي يساعد على تحديد المسار.</li>
                    <li>للشراكات المدرسية: نستخدم نتائج “محاكاة الصف” + هذا الملخص كجزء من عرض CPD.</li>
                    <li>النتائج تختلف من شخص لآخر — التقييم هو المرجع.</li>
                </ul>
                <p class="hint">ملاحظة تشغيلية: هذه القائمة مبنية على “AIT Checklist” (Education Issue date: 01/10/2025). </p>
            </div>
        </div>
    </section>



    

    <!-- PPTX Content (1:1) -->
    
    <!-- PPTX Content (1:1) -->
    <section class="content-section" id="pptx" style="background:var(--bg-primary)">
        <div class="section-header">
            <span class="section-tag">العرض التقديمي</span>
            <h2 class="section-title">العرض التقديمي – صور الشرائح 1:1</h2>
            <p class="section-desc">شبكة صور مصغّرة + بحث + فتح الشريحة بالحجم الكامل.</p>
        </div>

        <div style="max-width:1200px;margin:0 auto">
            <div class="card" style="margin-bottom:1rem">
                <div class="form-grid" style="grid-template-columns:1fr 1fr;gap:1rem">
                    <div class="field" style="margin-bottom:0">
                        <label>بحث داخل الشرائح</label>
                        <input id="pptxSearch" type="text" placeholder="اكتب كلمة مثل: APD / Hyperacusis / ADHD ..." />
                        <div class="hint">يتم الفلترة حسب عنوان/نص الشريحة.</div>
                    </div>
                    <div class="field" style="margin-bottom:0">
                        <label>عرض</label>
                        <select id="pptxView">
                            <option value="thumbs" selected>صور مصغرة</option>
                            <option value="text">نص فقط</option>
                        </select>
                        <div class="hint">اضغط على أي صورة لفتح الشريحة بالحجم الكامل.</div>
                    </div>
                </div>
            </div>

            <div id="pptxThumbs" class="pptx-grid"></div>
            <div class="faq-wrap" id="pptxSlides" style="display:none"></div>
        </div>
    </section>


<!-- Schools Section -->
    <section class="content-section" id="schools" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">للمدارس والجامعات</span>
            <h2 class="section-title">برنامج شراكة يدعم فرق الدمج</h2>
            <p class="section-desc">مسار واضح: تدريب (CPD) → إحالات → تقارير صفية → مراجعة ربع سنوية.</p>
        </div>
        <div class="schools-grid">
            <div class="school-card">
                <span class="badge">Tier 1 • توعية</span>
                <h3 style="font-size:1.2rem;font-weight:900;margin-top:.6rem">جلسة تدريب (CPD)</h3>
                <p style="color:var(--text-secondary)">ورشة للمعلمين حول مؤشرات APD داخل الصف واستراتيجيات تقليل الضوضاء وتحسين الفهم.</p>
                <ul>
                    <li>مواد PDF للمدرسة</li>
                    <li>جلسة أسئلة للأهالي</li>
                    <li>مسار إحالة منظم</li>
                </ul>
            </div>
            <div class="school-card">
                <span class="badge">Tier 2 • إحالة</span>
                <h3 style="font-size:1.2rem;font-weight:900;margin-top:.6rem">يوم فرز + إحالات</h3>
                <p style="color:var(--text-secondary)">فرز غير تشخيصي في المدرسة ثم مواعيد أولوية للتقييم في المركز.</p>
                <ul>
                    <li>نموذج إحالة</li>
                    <li>ملخص صفّي</li>
                    <li>خطة متابعة</li>
                </ul>
            </div>
            <div class="school-card">
                <span class="badge">Tier 3 • دعم</span>
                <h3 style="font-size:1.2rem;font-weight:900;margin-top:.6rem">دعم فصلي مستمر</h3>
                <p style="color:var(--text-secondary)">مراجعات دورية + مكتبة توصيات للصف + بوابة شريك (اختياري).</p>
                <ul>
                    <li>اجتماع ربع سنوي</li>
                    <li>توصيات صفية</li>
                    <li>تقارير قابلة للطباعة</li>
                </ul>
            </div>
        </div>
        <div style="max-width:1200px;margin:2rem auto 0;text-align:center">
            <button class="btn btn-primary" onclick="openSchoolPartnership()">📩 اطلب عرض الشراكة</button>
            <button class="btn btn-secondary" onclick="openGameSelector()">🎮 جرّب محاكاة الصف</button>
        </div>
    </section>


    <section class="game-section" id="games"><div class="section-header"><span class="section-tag">🎮 التجارب التفاعلية</span><h2 class="section-title">اختر تجربتك التفاعلية</h2><p class="section-desc">جرّب بنفسك تحديات المعالجة السمعية واكتشف كيف يمكن لبرنامج Bérard AIT مساعدة طفلك</p></div><div class="game-selector"><div class="game-mode-card" onclick="openQuizGame()"><div class="game-mode-icon"><span>✅</span></div><h3 class="game-mode-title">الاختبار التشخيصي</h3><p class="game-mode-desc">استبيان سريع لفحص أعراض اضطراب المعالجة السمعية</p></div><div class="game-mode-card" onclick="openToneGame()"><span class="game-mode-badge">جديد</span><div class="game-mode-icon"><span>🎶</span></div><h3 class="game-mode-title">لعبة مطابقة النغمات</h3><p class="game-mode-desc">لعبة سمعية لتحديد نغمة معينة وسط أصوات مشتتة</p></div><div class="game-mode-card" onclick="openClassroomGame()"><span class="game-mode-badge">جديد</span><div class="game-mode-icon"><span>🏫</span></div><h3 class="game-mode-title">محاكاة الفصل الدراسي</h3><p class="game-mode-desc">تحدٍ افتراضي لاتباع تعليمات المعلم وسط ضجيج الفصل</p></div></div></section>

    
    <!-- FAQ Section -->
    <section class="content-section" id="faq">
        <div class="section-header">
            <span class="section-tag">الأسئلة الشائعة</span>
            <h2 class="section-title">أسئلة نسمعها يومياً</h2>
            <p class="section-desc">إجابات مختصرة — ولأي استفسار يمكن التواصل مباشرة.</p>
        </div>
        <div class="faq-wrap">
            <div class="faq-item">
                <div class="faq-q" onclick="toggleFaq(this)">
                    <h3>كم مدة البرنامج وكم عدد الجلسات؟</h3>
                    <div class="faq-toggle"><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></div>
                </div>
                <div class="faq-a"><p>عادةً 20 جلسة خلال 10–12 يوماً، جلستان يومياً (30 دقيقة لكل جلسة) مع فاصل 3 ساعات على الأقل.</p></div>
            </div>
            <div class="faq-item">
                <div class="faq-q" onclick="toggleFaq(this)">
                    <h3>هل النتائج مضمونة؟</h3>
                    <div class="faq-toggle"><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></div>
                </div>
                <div class="faq-a"><p>لا يمكن ضمان النتائج؛ الاستجابة تختلف من شخص لآخر. هدفنا تقديم تقييم مهني وخطة واضحة ومتابعة تساعد على قياس التحسن بواقعية.</p></div>
            </div>
            <div class="faq-item">
                <div class="faq-q" onclick="toggleFaq(this)">
                    <h3>هل يمكن التأكد من اعتماد الممارس؟</h3>
                    <div class="faq-toggle"><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></div>
                </div>
                <div class="faq-a"><p>بحسب مواد العرض، يمكن التأكد من اعتماد الممارس عبر الموقع الرسمي لـ BAITIS (Berard AIT).</p></div>
            </div>
            <div class="faq-item">
                <div class="faq-q" onclick="toggleFaq(this)">
                    <h3>هل يمكن استخدام التجارب التفاعلية للتشخيص؟</h3>
                    <div class="faq-toggle"><svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg></div>
                </div>
                <div class="faq-a"><p>لا. الألعاب تجارب توعوية لشرح فكرة التشتت السمعي. التشخيص يتم فقط عبر تقييم مهني.</p></div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="content-section" id="contact" style="background:var(--bg-secondary)">
        <div class="section-header">
            <span class="section-tag">تواصل</span>
            <h2 class="section-title">احجز الآن أو اسألنا مباشرة</h2>
            <p class="section-desc">نستخدم واتساب للتواصل السريع. يمكنك أيضاً طلب شراكة مدرسة/جامعة.</p>
        </div>
        <div class="contact-grid">
            <div class="card">
                <h3>نموذج سريع</h3>
                <div class="field">
                    <label>الاسم</label>
                    <input id="leadName" type="text" placeholder="مثال: أحمد محمد">
                </div>
                <div class="field">
                    <label>رقم الهاتف</label>
                    <input id="leadPhone" type="tel" placeholder="مثال: 05xxxxxxxx">
                </div>
                <div class="field">
                    <label>الغرض</label>
                    <select id="leadPurpose">
                        <option value="assessment">حجز تقييم للطفل</option>
                        <option value="schools">شراكة مدرسة/جامعة</option>
                        <option value="question">استفسار عام</option>
                    </select>
                </div>
                <div class="field">
                    <label>رسالة</label>
                    <textarea id="leadMessage" placeholder="اكتب باختصار المشكلة أو هدف الشراكة..."></textarea>
                    <div class="hint">بالضغط على الإرسال سيتم فتح واتساب برسالة جاهزة.</div>
                </div>
                <div class="hero-buttons" style="justify-content:flex-start">
                    <button class="btn btn-primary" onclick="sendLeadToWhatsApp()">📩 إرسال عبر واتساب</button>
                    <button class="btn btn-secondary" onclick="openBooking()">📅 حجز تقييم</button>
                </div>
                <p class="hint" style="margin-top:1rem">تنويه: لا نشارك صور/فيديوهات العملاء إلا بموافقة مكتوبة. النتائج تختلف من شخص لآخر.</p>
            </div>

            <div class="card">
                <h3>معلومات المركز</h3>
                <p style="margin-bottom:.75rem"><strong>Lotus Retal • Abu Dhabi</strong></p>
                <div class="bullets" style="list-style:none;padding:0">
                    <li>📞 <strong id="clinicPhone"></strong></li>
                    <li>📸 Instagram: <strong id="clinicInstagram"></strong></li>
<li style="margin-top:.5rem">
  <a class="btn btn-secondary" style="padding:.6rem 1rem" href="#" onclick="openSocial('instagram');return false;">Instagram</a>
  <a class="btn btn-secondary" style="padding:.6rem 1rem" href="#" onclick="openSocial('tiktok');return false;">TikTok</a>
  <a class="btn btn-secondary" style="padding:.6rem 1rem" href="#" onclick="openSocial('facebook');return false;">Facebook</a>
  <a class="btn btn-secondary" style="padding:.6rem 1rem" href="#" onclick="openSocial('linkedin');return false;">LinkedIn</a>
</li>
                </div>
                <div style="margin-top:1rem;border-radius:var(--radius-xl);overflow:hidden;border:1px solid var(--border)">
                    <iframe title="Map" src="https://www.google.com/maps?q=Abu%20Dhabi&output=embed" width="100%" height="320" style="border:0" loading="lazy"></iframe>
                </div>
            </div>
        </div>
    </section>


    <section class="cta-section"><div class="cta-content"><h2 class="cta-title">السّمع = السّلوك</h2><p class="cta-desc">التكامل السمعي... نحو حياة أفضل</p><div class="cta-buttons"><button class="btn btn-white" onclick="openGameSelector()">🎮 جرّب التجارب التفاعلية</button><a href="#" class="btn btn-outline-white" onclick="openWhatsApp()">📞 تواصل معنا</a></div></div></section>

    <footer><div class="footer-content"><div><div class="footer-logo">Bérard AIT • Lotus Retal</div><div class="footer-tagline">التكامل السمعي... نحو حياة أفضل</div></div><div class="footer-links"><a href="#">عن البرنامج</a><a href="#">@lotus_retal</a></div></div></footer>

    <div class="whatsapp-btn" onclick="openWhatsApp()"><svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></div>

    <!-- Game Selector Modal -->
    <div class="modal-overlay" id="gameSelectorModal"><div class="modal"><div class="modal-header"><h2 class="modal-title">🎮 اختر تجربتك</h2><button class="modal-close" onclick="closeGameSelector()"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div><div class="modal-body"><div class="game-selector" style="grid-template-columns:1fr;max-width:100%;"><div class="game-mode-card" onclick="closeGameSelector();openQuizGame();"><div class="game-mode-icon"><span>✅</span></div><h3 class="game-mode-title">الاختبار التشخيصي</h3><p class="game-mode-desc">استبيان سريع (5 دقائق)</p></div><div class="game-mode-card" onclick="closeGameSelector();openToneGame();"><span class="game-mode-badge">جديد</span><div class="game-mode-icon"><span>🎶</span></div><h3 class="game-mode-title">لعبة مطابقة النغمات</h3><p class="game-mode-desc">استمع واضغط عند سماع النغمة المستهدفة</p></div><div class="game-mode-card" onclick="closeGameSelector();openClassroomGame();"><span class="game-mode-badge">جديد</span><div class="game-mode-icon"><span>🏫</span></div><h3 class="game-mode-title">محاكاة الفصل الدراسي</h3><p class="game-mode-desc">اتبع التعليمات وسط الضجيج</p></div></div></div></div></div>

    <!-- Tone Game Modal -->
    <div class="modal-overlay" id="toneGameModal"><div class="modal"><div class="modal-header"><h2 class="modal-title">🎶 لعبة مطابقة النغمات</h2><button class="modal-close" onclick="closeToneGame()"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div><div class="modal-body" id="toneGameContent"><div id="toneIntro" class="tone-game-container"><h3 style="font-size:1.2rem;margin-bottom:1rem;">هل يمكنك تمييز نغمتك الخاصة؟</h3><p style="color:var(--text-secondary);margin-bottom:1.5rem;">استمع للنغمة المستهدفة ثم اضغط الزر عندما تسمعها.</p><div class="tone-target-area"><div class="tone-target-label">🔉 النغمة المستهدفة</div><button class="tone-play-target" onclick="playTargetTonePreview()">▶️ اسمع النغمة</button></div><button class="btn btn-primary" onclick="startToneGame()" style="margin-top:1rem;">ابدأ اللعبة</button></div><div id="toneGamePlay" class="tone-game-container" style="display:none;"><div class="tone-target-area" style="padding:.85rem;"><button class="tone-play-target" onclick="playTargetTonePreview()" style="font-size:.85rem;padding:.5rem 1rem;">🔁 اسمع النغمة</button></div><div class="tone-waveform" id="toneWaveform"><div class="tone-bar" style="height:18px;"></div><div class="tone-bar" style="height:32px;"></div><div class="tone-bar" style="height:22px;"></div><div class="tone-bar" style="height:42px;"></div><div class="tone-bar" style="height:28px;"></div><div class="tone-bar" style="height:48px;"></div><div class="tone-bar" style="height:32px;"></div><div class="tone-bar" style="height:38px;"></div></div><button class="tone-hit-btn" id="toneHitBtn" onclick="hitTone()">اضغط عند<br>سماع النغمة</button><div class="tone-stats"><div class="tone-stat">التقدم: <span id="toneProgress">0</span>/20</div><div class="tone-stat">الإصابات: <span id="toneHits">0</span></div></div></div><div id="toneResult" class="result-container" style="display:none;"></div></div></div></div>

    <!-- Classroom Game Modal -->
    <div class="modal-overlay" id="classroomGameModal"><div class="modal"><div class="modal-header"><h2 class="modal-title">🏫 محاكاة الفصل الدراسي</h2><button class="modal-close" onclick="closeClassroomGame()"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div><div class="modal-body" id="classroomGameContent"><div id="classroomIntro" style="text-align:center;padding:2rem;"><div style="font-size:3.5rem;margin-bottom:1rem;">🏫</div><h3 style="font-size:1.2rem;margin-bottom:1rem;">تخيل نفسك في فصل مليء بالضجيج</h3><p style="color:var(--text-secondary);margin-bottom:1.5rem;">ستسمع تعليمات من المعلم — حاول أن تركز وتنفذ ما يُطلب منك.</p><button class="btn btn-primary" onclick="startClassroomGame()">ابدأ المحاكاة</button></div><div id="classroomGamePlay" style="display:none;"><div class="classroom-scene"><div class="classroom-teacher"><div class="teacher-avatar" id="teacherAvatar">👩‍🏫</div><div class="teacher-label" id="teacherLabel">المعلّمة تتحدث...</div></div><div class="classroom-task-area" id="classroomTaskArea"></div><div class="classroom-noise-indicator"><span>🔊</span><div class="noise-bars"><div class="noise-bar"></div><div class="noise-bar"></div><div class="noise-bar"></div><div class="noise-bar"></div><div class="noise-bar"></div></div></div></div><div class="classroom-progress"><div class="progress-bar"><div class="progress-fill" id="classroomProgressFill" style="width:0%;"></div></div><div class="progress-text"><span id="classroomTaskNum">1</span>/5</div></div></div><div id="classroomResult" class="result-container" style="display:none;"></div></div></div></div>

    <!-- Quiz Modal -->
    <div class="modal-overlay" id="quizModal"><div class="modal"><div class="modal-header"><h2 class="modal-title">✅ الاختبار التشخيصي</h2><button class="modal-close" onclick="closeQuizGame()"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></button></div><div class="modal-body" id="quizContent"></div></div></div>



    <button class="to-top" id="toTop" aria-label="العودة للأعلى"><svg viewBox="0 0 24 24"><path d="M12 8l6 6H6l6-6z"/></svg></button>

    <!-- Slide Viewer Modal -->
    <div class="modal-overlay" id="slideViewerModal" aria-hidden="true">
        <div class="modal" style="max-width:1100px">
            <button class="modal-close" onclick="closeSlideViewer()" aria-label="إغلاق">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <div class="modal-header">
                <h2 class="modal-title" id="slideViewerTitle">العرض التقديمي</h2>
            </div>
            <div class="modal-body" style="padding:1.25rem 1.25rem 2rem">
                <div style="display:grid;grid-template-columns:1.35fr .65fr;gap:1rem;align-items:start">
                    <div style="background:var(--bg-tertiary);border:1px solid var(--border);border-radius:var(--radius-xl);overflow:hidden">
                        <img id="slideViewerImg" src="" alt="Slide" style="width:100%;display:block">
                    </div>
                    <div class="card" style="margin:0">
                        <h3 id="slideViewerH" style="margin-bottom:.5rem">—</h3>
                        <div class="hint" id="slideViewerMeta" style="margin-bottom:.75rem"></div>
                        <div id="slideViewerText" style="color:var(--text-secondary);line-height:1.9;max-height:60vh;overflow:auto"></div>
                        <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-top:1rem">
                            <button class="btn btn-secondary" onclick="prevSlide()">◀︎ السابق</button>
                            <button class="btn btn-secondary" onclick="nextSlide()">التالي ▶︎</button>
                            <a class="btn btn-primary" href="#contact" onclick="closeSlideViewer()">📩 تواصل معنا</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
