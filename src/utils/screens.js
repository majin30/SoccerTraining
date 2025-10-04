export const screens = {
    auth: {
      authStartScreen: 'AuthStartScreen',
      loginScreen: 'LoginScreen',
      registerScreen: 'RegisterScreen',
    },
    global: {
      userProfileScreen: 'UserProfileScreen',
      cameraScreen: 'CameraScreen',
      imageFullScreen: 'ImageFullScreen',
    },
    tab: {
      root: 'BottomTabRoot',
      training: { root: 'TrainingRoot', dashboard: 'TrainingDashboard', exercise: 'ExerciseDetail', custom: 'CustomTraining' },
      progress: { root: 'ProgressRoot', overview: 'ProgressOverview', history: 'History', achievements: 'Achievements' },
      nutrition: { root: 'NutritionRoot', dashboard: 'NutritionDashboard', hydration: 'Hydration', supplements: 'Supplements' },
      settings: { root: 'SettingsRoot', main: 'SettingsScreen', editProfile: 'EditProfile', notifications: 'Notifications' },
    },
  };
  