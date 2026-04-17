
import React, { useState, useEffect, useRef } from 'react';
import { 
  Thermometer, 
  ThermometerSun, 
  ThermometerSnowflake, 
  FlaskConical, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Activity, 
  HelpCircle, 
  Lightbulb,
  ChefHat,
  Factory,
  Refrigerator
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState(1);

  // --- State for Section 2: Experiment ---
  const [temperature, setTemperature] = useState(50); // 0 to 100
  const [reactionProgress, setReactionProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning && reactionProgress < 100) {
      interval = setInterval(() => {
        // Reaction rate increases non-linearly with temperature (simulating Arrhenius equation broadly)
        const rate = Math.max(0.5, (temperature / 100) * 5); 
        setReactionProgress((prev) => {
          const next = prev + rate;
          return next >= 100 ? 100 : next;
        });
        setTimeElapsed((prev) => prev + 0.1);
      }, 100);
    } else if (reactionProgress >= 100) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, reactionProgress, temperature]);

  const handleStartExperiment = () => {
    if (reactionProgress >= 100) {
      setReactionProgress(0);
      setTimeElapsed(0);
    }
    setIsRunning(true);
  };

  const handleResetExperiment = () => {
    setIsRunning(false);
    setReactionProgress(0);
    setTimeElapsed(0);
  };

  // --- State for Section 3: Quiz ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const questions = [
    {
      question: "ماذا يحدث لسرعة التفاعل الكيميائي عند رفع درجة الحرارة؟",
      options: ["تقل سرعة التفاعل", "تزداد سرعة التفاعل", "لا تتأثر سرعة التفاعل", "يتوقف التفاعل تماماً"],
      answer: 1
    },
    {
      question: "حسب نظرية التصادم، رفع درجة الحرارة يؤدي إلى...",
      options: ["تقليل الطاقة الحركية للجزيئات", "تقليل عدد التصادمات", "زيادة الطاقة الحركية وزيادة التصادمات الفعالة", "تغيير نوع المواد المتفاعلة"],
      answer: 2
    },
    {
      question: "لماذا نضع الأطعمة في الثلاجة؟",
      options: ["لزيادة سرعة تفاعلات التلف", "لإكسابها طعماً أفضل", "لإبطاء سرعة التفاعلات الكيميائية التي تسبب التلف", "لزيادة عدد البكتيريا"],
      answer: 2
    }
  ];

  const handleAnswerSubmit = (index) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].answer;
    setIsAnswerCorrect(correct);
    
    if (correct) setScore(score + 1);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  // --- Render Helpers ---
  const getTemperatureColor = (temp) => {
    if (temp < 30) return 'text-blue-400';
    if (temp < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getTemperatureBg = (temp) => {
    if (temp < 30) return 'bg-blue-500';
    if (temp < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 font-sans text-slate-200 p-4 md:p-8">
      {/* Custom Styles for Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes jiggle-slow {
          0% { transform: translate(0, 0); }
          25% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, 1px); }
          75% { transform: translate(1px, 2px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes jiggle-fast {
          0% { transform: translate(0, 0); }
          25% { transform: translate(6px, -6px); }
          50% { transform: translate(-6px, 4px); }
          75% { transform: translate(4px, 6px); }
          100% { transform: translate(0, 0); }
        }
        .particle-slow { animation: jiggle-slow 2s infinite ease-in-out; }
        .particle-fast { animation: jiggle-fast 0.3s infinite ease-in-out; }
        
        @keyframes bubble-rise {
          0% { transform: translateY(100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-200%); opacity: 0; }
        }
        .bubble {
          animation: bubble-rise infinite linear;
        }
      `}} />

      <header className="max-w-6xl mx-auto mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Thermometer className="w-10 h-10 text-red-500" />
          أثر درجة الحرارة على سرعة التفاعل
        </h1>
        <p className="text-slate-400 text-lg">لوحة تعليمية تفاعلية تستكشف العلاقة بين الحرارة والتفاعلات الكيميائية</p>
      </header>

      <main className="max-w-6xl mx-auto bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 bg-slate-950">
          {[
            { id: 1, title: 'التفسير العلمي', icon: <BookOpen className="w-5 h-5" /> },
            { id: 2, title: 'التجربة التفاعلية', icon: <FlaskConical className="w-5 h-5" /> },
            { id: 3, title: 'اختبر معلوماتك', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 4, title: 'تطبيقات حياتية', icon: <Lightbulb className="w-5 h-5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[150px] py-4 px-2 flex items-center justify-center gap-2 text-sm md:text-base font-semibold transition-colors duration-200 ${
                activeTab === tab.id 
                  ? 'bg-slate-900 text-blue-400 border-b-2 border-blue-400' 
                  : 'text-slate-500 hover:text-blue-300 hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-10 min-h-[500px]">
          
          {/* Section 1: Explanation */}
          {activeTab === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> نظرية التصادم والحرارة
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4 text-lg leading-relaxed text-slate-300">
                  <p>
                    تعتمد سرعة أي تفاعل كيميائي على <strong className="text-blue-400">نظرية التصادم</strong>، والتي تنص على أن الجزيئات يجب أن تتصادم مع بعضها البعض حتى تتفاعل.
                  </p>
                  <div className="bg-blue-900/20 p-4 rounded-xl border border-blue-800/50">
                    <h3 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                      <ThermometerSun className="w-5 h-5 text-red-400"/> ماذا يحدث عند التسخين؟
                    </h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>تكتسب الجزيئات <strong>طاقة حركية</strong> أعلى.</li>
                      <li>تتحرك بسرعة أكبر وتتصادم بشكل <strong>متكرر</strong>.</li>
                      <li>تكون التصادمات <strong>أكثر عنفاً</strong> (طاقة كافية لكسر الروابط).</li>
                      <li><strong className="text-red-400">النتيجة:</strong> تزداد سرعة التفاعل الكيميائي.</li>
                    </ul>
                  </div>
                </div>

                {/* Visual Representation */}
                <div className="bg-slate-800 p-6 rounded-2xl flex flex-col justify-center items-center gap-8 border border-slate-700">
                  <h3 className="text-xl font-bold text-slate-200">مقارنة حركة الجزيئات</h3>
                  
                  <div className="flex gap-8 w-full justify-center">
                    {/* Cold Box */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-32 h-32 bg-blue-900/40 border-4 border-blue-600 rounded-full relative overflow-hidden flex items-center justify-center">
                        {[...Array(8)].map((_, i) => (
                          <div key={`cold-${i}`} className="absolute w-4 h-4 bg-blue-400 rounded-full particle-slow" 
                               style={{ top: `${20 + Math.random()*60}%`, left: `${20 + Math.random()*60}%`, animationDelay: `${Math.random()}s` }}></div>
                        ))}
                      </div>
                      <span className="font-bold text-blue-400 flex items-center gap-1"><ThermometerSnowflake className="w-4 h-4"/> حرارة منخفضة</span>
                      <span className="text-sm text-slate-400">حركة بطيئة = تصادمات أقل</span>
                    </div>

                    {/* Hot Box */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-32 h-32 bg-red-900/40 border-4 border-red-600 rounded-full relative overflow-hidden flex items-center justify-center">
                        {[...Array(8)].map((_, i) => (
                          <div key={`hot-${i}`} className="absolute w-4 h-4 bg-red-500 rounded-full particle-fast" 
                               style={{ top: `${20 + Math.random()*60}%`, left: `${20 + Math.random()*60}%`, animationDelay: `${Math.random()}s` }}></div>
                        ))}
                      </div>
                      <span className="font-bold text-red-400 flex items-center gap-1"><ThermometerSun className="w-4 h-4"/> حرارة مرتفعة</span>
                      <span className="text-sm text-slate-400">حركة سريعة = تصادمات أكثر</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Experiment */}
          {activeTab === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-2 text-blue-400 flex items-center gap-2">
                <Activity className="w-6 h-6" /> مختبر المحاكاة: قرص فوار في الماء
              </h2>
              <p className="text-slate-400 mb-8">اضبط درجة حرارة الماء، ثم ابدأ التفاعل ولاحظ الوقت المستغرق لذوبان القرص الفوار بالكامل.</p>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Controls */}
                <div className="lg:col-span-1 bg-slate-800 p-6 rounded-2xl border border-slate-700 flex flex-col gap-6">
                  <div>
                    <label className="block text-lg font-bold mb-4 text-slate-200">درجة حرارة الماء: <span className={`text-2xl ${getTemperatureColor(temperature)}`}>{temperature}°C</span></label>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={temperature}
                      onChange={(e) => setTemperature(Number(e.target.value))}
                      disabled={isRunning && reactionProgress > 0 && reactionProgress < 100}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                      <span>0°C (بارد جداً)</span>
                      <span>100°C (يغلي)</span>
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <button 
                      onClick={handleStartExperiment}
                      disabled={isRunning && reactionProgress < 100}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <Play className="w-5 h-5" /> {reactionProgress >= 100 ? 'إعادة التشغيل' : 'بدء التفاعل'}
                    </button>
                    <button 
                      onClick={handleResetExperiment}
                      className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold rounded-xl flex items-center justify-center gap-2 transition"
                    >
                      <RotateCcw className="w-5 h-5" /> إعادة الضبط
                    </button>
                  </div>
                </div>

                {/* Simulation Display */}
                <div className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                  
                  {/* Results Dashboard */}
                  <div className="w-full flex justify-between items-center mb-8 px-4 py-3 bg-slate-800 rounded-xl border border-slate-700">
                    <div className="text-center">
                      <span className="block text-sm text-slate-400">الوقت المستغرق</span>
                      <span className="text-2xl font-mono font-bold text-slate-200">{timeElapsed.toFixed(1)} ثانية</span>
                    </div>
                    <div className="text-center w-1/2">
                      <span className="block text-sm text-slate-400 mb-1">اكتمال التفاعل</span>
                      <div className="w-full bg-slate-700 h-4 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-100 ${getTemperatureBg(temperature)}`}
                          style={{ width: `${reactionProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* The Beaker */}
                  <div className="relative w-48 h-64 border-4 border-t-0 border-slate-500 rounded-b-3xl bg-slate-900 overflow-hidden flex items-end">
                    {/* Water Level */}
                    <div className={`w-full transition-all duration-300 opacity-70 ${getTemperatureBg(temperature)}`} style={{ height: '80%' }}>
                       {/* Bubbles */}
                       {isRunning && reactionProgress < 100 && (
                          <div className="absolute inset-0 w-full h-full">
                            {[...Array(Math.floor(temperature / 5) + 5)].map((_, i) => (
                              <div 
                                key={i} 
                                className="absolute bottom-0 bg-white rounded-full bubble opacity-40"
                                style={{
                                  width: `${Math.random() * 8 + 4}px`,
                                  height: `${Math.random() * 8 + 4}px`,
                                  left: `${Math.random() * 100}%`,
                                  animationDuration: `${(100 - temperature) / 50 + 0.5}s`,
                                  animationDelay: `${Math.random() * 2}s`
                                }}
                              ></div>
                            ))}
                          </div>
                       )}
                    </div>
                    {/* The Tablet */}
                    {reactionProgress < 100 && (
                      <div 
                        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-200 border-2 border-yellow-500 rounded-full transition-all duration-100"
                        style={{ 
                          width: `${40 * (1 - reactionProgress/100)}px`, 
                          height: `${15 * (1 - reactionProgress/100)}px`,
                          opacity: 1 - reactionProgress/100
                        }}
                      ></div>
                    )}
                  </div>
                  
                  {reactionProgress >= 100 && (
                    <div className="mt-4 text-green-400 font-bold flex items-center gap-2 animate-bounce">
                      <CheckCircle2 className="w-6 h-6" /> اكتمل التفاعل!
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* Section 3: Quiz */}
          {activeTab === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-2 justify-center">
                <HelpCircle className="w-6 h-6" /> تحدي المعرفة
              </h2>

              {!showResults ? (
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-sm">
                  <div className="flex justify-between items-center mb-6 text-sm font-bold text-slate-400">
                    <span>السؤال {currentQuestion + 1} من {questions.length}</span>
                    <span>النتيجة: {score}</span>
                  </div>
                  
                  <div className="mb-8">
                    <div className="w-full bg-slate-700 h-2 rounded-full mb-6">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{width: `${((currentQuestion) / questions.length) * 100}%`}}></div>
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-relaxed">
                      {questions[currentQuestion].question}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {questions[currentQuestion].options.map((option, index) => {
                      let btnClass = "w-full text-right p-4 rounded-xl border-2 transition-all duration-200 font-medium text-lg ";
                      
                      if (selectedAnswer === null) {
                        btnClass += "border-slate-600 hover:border-blue-500 hover:bg-blue-900/30 text-slate-200";
                      } else {
                        if (index === questions[currentQuestion].answer) {
                          btnClass += "border-green-500 bg-green-900/30 text-green-400"; // Correct answer
                        } else if (index === selectedAnswer) {
                          btnClass += "border-red-500 bg-red-900/30 text-red-400"; // Wrong selected answer
                        } else {
                          btnClass += "border-slate-700 text-slate-500 opacity-50"; // Other options faded
                        }
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => handleAnswerSubmit(index)}
                          disabled={selectedAnswer !== null}
                          className={btnClass}
                        >
                          <div className="flex justify-between items-center">
                            <span>{option}</span>
                            {selectedAnswer !== null && index === questions[currentQuestion].answer && <CheckCircle2 className="w-6 h-6 text-green-400" />}
                            {selectedAnswer === index && index !== questions[currentQuestion].answer && <XCircle className="w-6 h-6 text-red-400" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-slate-800 p-10 rounded-2xl border border-slate-700 text-center shadow-sm">
                  <div className="w-24 h-24 bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Activity className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">اكتمل التحدي!</h3>
                  <p className="text-xl text-slate-300 mb-8">
                    لقد أجبت بشكل صحيح على <strong className="text-blue-400 text-2xl">{score}</strong> من أصل <strong className="text-white">{questions.length}</strong> أسئلة.
                  </p>
                  <button 
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" /> إعادة الاختبار
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Section 4: Practical Applications */}
          {activeTab === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold mb-2 text-blue-400 flex items-center gap-2">
                <Lightbulb className="w-6 h-6" /> تطبيقات في حياتنا اليومية
              </h2>
              <p className="text-slate-400 mb-8 text-lg">كيف نستفيد من التحكم بدرجة الحرارة للتحكم في سرعة التفاعلات في حياتنا؟</p>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Application 1 */}
                <div className="bg-blue-900/20 p-6 rounded-2xl border border-blue-800/50 hover:bg-blue-900/30 transition duration-300">
                  <div className="w-14 h-14 bg-blue-900/80 text-blue-400 rounded-2xl flex items-center justify-center mb-4 border border-blue-700/50">
                    <Refrigerator className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">حفظ الأطعمة</h3>
                  <p className="text-slate-400 leading-relaxed">
                    نضع الأطعمة في الثلاجة (خفض درجة الحرارة) لإبطاء التفاعلات الكيميائية ونمو البكتيريا التي تسبب تعفن الطعام، مما يجعله صالحاً لفترة أطول.
                  </p>
                </div>

                {/* Application 2 */}
                <div className="bg-orange-900/20 p-6 rounded-2xl border border-orange-800/50 hover:bg-orange-900/30 transition duration-300">
                  <div className="w-14 h-14 bg-orange-900/80 text-orange-400 rounded-2xl flex items-center justify-center mb-4 border border-orange-700/50">
                    <ChefHat className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">طهي الطعام</h3>
                  <p className="text-slate-400 leading-relaxed">
                    نستخدم الأفران والمواقد (رفع درجة الحرارة) لتسريع التفاعلات الكيميائية التي تحول المكونات النيئة إلى طعام ناضج وشهي في وقت قصير.
                  </p>
                </div>

                {/* Application 3 */}
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:bg-slate-800 transition duration-300">
                  <div className="w-14 h-14 bg-slate-700 text-slate-300 rounded-2xl flex items-center justify-center mb-4 border border-slate-600">
                    <Factory className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-200 mb-3">الصناعات الكيميائية</h3>
                  <p className="text-slate-400 leading-relaxed">
                    في المصانع، يتم رفع درجات حرارة المفاعلات لتسريع إنتاج المواد الكيميائية (مثل الأسمدة والأدوية) لزيادة الإنتاج وتوفير الوقت والجهد.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-gradient-to-r from-blue-900 to-slate-800 border border-blue-800/50 p-6 rounded-2xl text-center shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-white">خلاصة القول</h3>
                <p className="text-blue-200 text-lg">التحكم في درجة الحرارة هو المفتاح السحري للتحكم في الزمن الذي تستغرقه التفاعلات الكيميائية من حولنا!</p>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
