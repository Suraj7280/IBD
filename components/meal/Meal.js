import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Footer from '../footer/Footer';

const Meal = ({navigation}) => {
  const [educationalTips, setEducationalTips] = useState([
    "Stay hydrated by drinking plenty of water throughout the day.",
    "Focus on eating a balanced diet rich in fruits, vegetables, lean proteins, and whole grains.",
    "Gradually increase fiber intake to support gut health, but be cautious during flare-ups.",
    "Practice stress management techniques such as deep breathing and meditation.",
    "Adhere to your medication regimen as prescribed by your healthcare provider.",
    "Incorporate regular exercise into your routine to support overall health and well-being.",
    "Monitor your symptoms and triggers, and communicate any changes with your healthcare provider.",
    "Seek support from others who have IBD to share experiences and coping strategies.",
    "Attend routine check-ups with your gastroenterologist to monitor your condition and adjust treatment plans.",
    "Educate yourself about IBD by staying informed and asking questions during appointments.",
    "Avoid smoking and excessive alcohol consumption, as they can exacerbate symptoms of IBD.",
    "Consider keeping a food diary to track your diet and identify any foods that may trigger symptoms.",
    "Be aware of potential medication side effects and discuss any concerns with your healthcare provider.",
    "Take steps to reduce inflammation in your body, such as consuming anti-inflammatory foods like fatty fish, nuts, and leafy greens.",
    "Make time for relaxation and self-care activities to reduce stress and improve overall well-being.",
    "Stay up-to-date on the latest research and treatment options for IBD to empower yourself as a patient.",
    "Include probiotics in your diet to promote a healthy balance of gut bacteria and support digestive health.",
    "Practice good hygiene, especially during times of illness or flare-ups, to prevent infections and complications.",
    "Consider joining a support group or online community for individuals with IBD to connect with others and share experiences.",
    "Be proactive in managing your healthcare by advocating for yourself and communicating openly with your healthcare team.",
    "Limit caffeine and spicy foods, as they may irritate the digestive system and worsen symptoms.",
    "Ensure you get enough sleep each night to support your body's natural healing processes and reduce inflammation.",
    "Experiment with different meal sizes and frequencies to find what works best for your digestion and energy levels.",
    "Be mindful of your mental health and seek professional support if you're struggling with anxiety, depression, or other mood disorders.",
    "Consider alternative therapies such as acupuncture, yoga, or massage to complement traditional medical treatments and improve overall well-being.",
    "Stay informed about potential environmental triggers for IBD, such as air pollution or exposure to certain chemicals.",
    "Take breaks throughout the day to rest and recharge, especially during periods of increased stress or fatigue.",
    "Stay connected with friends and family for emotional support and encouragement during challenging times.",
    "Be patient with yourself and acknowledge that managing IBD is an ongoing journey with ups and downs.",
    "Advocate for policies and initiatives that support individuals with IBD, such as improved access to healthcare and research funding.",
    "Educate others about IBD to raise awareness and reduce stigma surrounding the condition.",
    "Explore complementary therapies such as herbal supplements or essential oils under the guidance of a qualified healthcare professional.",
    "Stay organized by keeping track of appointments, medications, and symptoms in a journal or digital app.",
    "Practice mindful eating by paying attention to your body's hunger and fullness cues, and savoring each bite of food.",
    "Engage in regular physical activity that you enjoy, whether it's walking, swimming, or yoga, to improve mood and reduce inflammation.",
    "Stay positive and maintain a hopeful outlook, focusing on the things you can control and finding joy in everyday activities."
  ]);
  

  const [motivationalTips, setMotivationalTips] = useState([
    "You are stronger than you think. Keep pushing forward!",
    "Every setback is a setup for a comeback. Stay resilient!",
    "Believe in yourself and your ability to overcome challenges.",
    "Focus on progress, not perfection. Each small step forward counts.",
    "Your journey may be tough, but so are you. Keep fighting!",
    "Embrace the power of positivity. You have the strength to conquer any obstacle.",
    "Challenges make you stronger. Embrace them as opportunities for growth.",
    "You are not alone in this journey. Reach out for support when needed.",
    "Visualize your success and keep moving towards your goals.",
    "Your determination will lead you to victory. Stay motivated!",
    "Stay focused on your goals and never lose sight of your dreams.",
    "Trust in your ability to overcome adversity and emerge stronger.",
    "Find inspiration in the progress you've made and the obstacles you've overcome.",
    "Celebrate your victories, no matter how small, and use them as fuel to keep moving forward.",
    "You have the power to shape your own destiny. Believe in your ability to create the life you want.",
    "Stay committed to your goals, even when faced with challenges or setbacks.",
    "Your resilience and perseverance will carry you through even the toughest times.",
    "Take pride in your journey and the person you are becoming along the way.",
    "Remember that every day is a new opportunity to make progress and grow.",
    "Believe in the power of possibility and the potential for positive change.",
    "Stay focused on the present moment and the steps you can take right now.",
    "Find strength in the support of others and the connections you've built.",
    "Keep a positive attitude and outlook, even when faced with difficulties.",
    "You are capable of achieving amazing things. Believe in yourself!",
    "Embrace the challenges you face as opportunities for learning and growth.",
    "Stay true to your values and beliefs, even in the face of adversity.",
    "Keep moving forward, one step at a time, towards your goals and dreams.",
    "You have the strength and resilience to overcome any obstacle that comes your way.",
    "Find joy in the journey and take time to appreciate the progress you've made.",
    "Stay motivated by setting clear goals and taking consistent action towards achieving them.",
    "You are capable of overcoming any challenge that comes your way. Keep pushing forward!",
    "Stay focused on your goals and the positive impact you can make in the world.",
    "Believe in your ability to persevere, even when faced with challenges.",
    "Stay resilient in the face of adversity, knowing that you have the strength to overcome.",
    "Find inspiration in the stories of others who have overcome similar challenges.",
    "Remember that every setback is an opportunity to learn and grow stronger.",
    "Stay committed to your goals and dreams, even when the going gets tough.",
    "You are stronger and more resilient than you realize. Keep pushing forward!",
    "Stay focused on the present moment and the actions you can take right now.",
  ]);
  
  
  const getRandomTip = (tipsArray) => {
    const randomIndex = Math.floor(Math.random() * tipsArray.length);
    return tipsArray[randomIndex];
  };

  const [currentEducationalTip, setCurrentEducationalTip] = useState(getRandomTip(educationalTips));
  const [currentMotivationalTip, setCurrentMotivationalTip] = useState(getRandomTip(motivationalTips));

  return (
  <><View style={styles.container}>
      <View style={styles.upperheader}>
                    <View style={styles.upperheadercontent}>
                    <View style={styles.username}>
                        
                        <Text style={styles.usernamestyles}>IBD Tips Screen</Text>
                       
                    </View>
                    </View>
               </View>
      <TouchableOpacity style={styles.tipContainer} onPress={() => setCurrentEducationalTip(getRandomTip(educationalTips))}>
        <Text style={styles.tipTitle}>Educational Tip</Text>
        <Text style={styles.tip}>{currentEducationalTip}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tipContainer} onPress={() => setCurrentMotivationalTip(getRandomTip(motivationalTips))}>
        <Text style={styles.tipTitle}>Motivational Tip</Text>
        <Text style={styles.tip}>{currentMotivationalTip}</Text>
      </TouchableOpacity>
      
    </View>
    <Footer />
  </>
    
  );
};

const styles = StyleSheet.create({
  container: {

   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    
  },
  tipContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  tip: {
    fontSize: 16,
    color: '#666'
  },
  upperheader:{
    backgroundColor: 'blueviolet',
    height:110,
    width:'100%',
    bottom:10
},
upperheadercontent:{
    top:40,
    display:'flex',
    flexDirection:'row',
},
username:{
   left:10
},
usernamestyle:{
    color:'white',
    fontWeight:"bold",
    fontSize:25
},
usernamestyles:{
    color:'white',
    
    fontSize:20
},
});

export default Meal;
