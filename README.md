# 🏋️‍♂️ Workout Logger – React Native Technical Assessment

Welcome! This is your **Bolder.fit Technical Challenge**.
Your goal is to build a production-ready, offline-first **Workout Logger App** in React Native.

This challenge is designed to test your ability to architect, implement, and document a real-world offline-capable application.

---

## 🎯 Your Mission

You’ll build a workout logging app that:

* Works **seamlessly offline**
* **Syncs data intelligently** when back online
* Handles real-world edge cases gracefully (bad WiFi at the gym, multi-device conflicts, background syncs, etc.)

Think of it as your personal gym buddy that never loses track of your progress. 💪

---

## 🔍 What You’ll Be Evaluated On

| Area                                    | Weight | What We’re Looking For                                     |
| --------------------------------------- | ------ | ---------------------------------------------------------- |
| **🗃️ Redux Offline + Persist Mastery** | 40%    | Custom retry logic, conflict resolution, schema migrations |
| **📱 Workout Logging Interface**        | 25%    | Smooth performance, intuitive UX with large datasets       |
| **🔄 Sync Intelligence**                | 20%    | Smart background sync, handling partial failures           |
| **🏗️ Code Architecture**               | 15%    | Clean, production-ready patterns in TypeScript             |

---

## 🚀 Getting Started

### Step 1: See the Demo

Check out this [**Interactive Demo**](https://raheememad.github.io/Live_Demo/) and its [**Documentation**](https://github.com/RaheemEmad/Live_Demo).
Play with it offline/online to understand what you’re aiming to build.

### Step 2: Plan Your Time (Approx. 72 Hours)

* **Day 1:** Set up Redux architecture (Redux-Persist + Redux Offline)
* **Day 2:** Build workout logging features + optimize performance
* **Day 3:** Polish, test, and document your solution

We understand everyone has different schedules. If you need more time, communicate with us.

---

## 🎪 Core Requirements

### 1. 🗃️ Redux Offline + Redux-Persist (40%)

This is the core of the challenge. Show us your **advanced handling** of offline-first Redux state.

Your Redux state should cover:

* Workout sessions, exercises, categories, and stats
* Network state, queued actions, retry logic, and persistence

**Advanced Expectations:**

* Custom retry logic (beyond default exponential backoff)
* Conflict resolution between devices
* Schema migrations for evolving data
* Rollback mechanisms for failed optimistic updates
* Middleware to validate/sanitize workout data

---

### 2. 📱 Workout Logging Interface (25%)

Your app should feel **fast, smooth, and intuitive**.

**Features to include:**

* Live session tracking (sets, reps, weight, rest timers)
* Exercise search (1000+ exercises)
* Workout templates
* Progress tracking (with trends)
* Background timers

**Performance goals:**

* Efficient FlatList rendering (500+ items)
* Debounced search with virtualization
* Smooth animations at 60fps
* Memory efficiency during long sessions

---

### 3. 🔄 Offline Data Synchronization (20%)

Make data syncing **invisible and reliable**.

Handle:

* Background sync when coming back online
* Delta sync (only changed data)
* Partial failures
* App crashes/kills during sync
* Multi-device conflicts

---

## 🎨 Bonus Challenges (Optional, Extra Credit)

Pick 2 of these 4 to really stand out:

* 🧭 **Advanced Navigation** (deep linking, state persistence, TypeScript typing)
* 📊 **Performance Monitoring** (custom metrics, leak detection, startup optimization)
* 📱 **Native Integrations** (background timers, biometrics, platform optimizations)
* 🛡️ **Error Handling** (error boundaries, retry hooks, memory warnings)

---

## 🏗️ Suggested Project Structure

```
src/
├── store/                  # Main focus
│   ├── slices/             # Redux slices
│   ├── middleware/         # Offline & persistence logic
│   ├── transforms/         # Persist transforms
│   └── migrations/         # Schema migrations
├── components/             # UI components
├── screens/                # App screens
├── services/               # Sync, storage, API
└── utils/                  # Utilities (offline, performance)
```

---

## 🎥 Demo Video (5–7 minutes)

Show us:

1. App working offline (airplane mode recommended)
2. Data syncing after reconnection
3. Conflict resolution in action
4. Smooth performance with large datasets
5. Recovery from sync failures

---

## 🧪 What We’re Looking For

**A strong submission includes:**

* Offline-first reliability
* Custom Redux Offline configuration
* Realistic performance optimization
* Error handling and resilience
* Clear documentation of decisions

**Avoid:**

* Default Redux Offline setup with no customization
* Missing conflict resolution
* Memory leaks
* No demo of offline functionality

---

## 📚 Documentation to Submit

1. **Architecture Decision Records (ADRs)**

   * Why you chose your Redux Offline setup
   * How your conflict resolution works
   * Trade-offs for performance

2. **README.md**

   * Setup instructions
   * Architecture overview
   * Key optimizations

3. **Testing Strategy**

   * Unit tests for Redux slices (esp. offline logic)
   * Integration tests for sync scenarios
   * Performance benchmarks

---

## 🎪 Extra Challenges to Try

* Does your app pass the **Airplane Mode Test**?
* Can it survive **bad gym WiFi**?
* Does it handle a **power user** (logging 5 workouts/day)?
* Can it sync correctly across **multiple devices**?

---

## 🤝 Resources

* [Redux Offline Docs](https://github.com/redux-offline/redux-offline)
* [Redux-Persist Docs](https://github.com/rt2zz/redux-persist)
* [React Native Performance Guide](https://reactnative.dev/docs/performance)

---

## 🚀 Submission Steps

1. Fork this repo
2. Set up your dev environment
3. Explore the demo
4. Start with Redux architecture
5. Build incrementally & commit frequently
6. Document your decisions

---

## 🏆 Final Note

This challenge is about more than just working code—it’s about showing your ability to solve complex **offline-first architecture problems** thoughtfully and thoroughly.

We’re excited to see how you approach it.
Good luck, and may your Redux store stay in sync! 🚀

