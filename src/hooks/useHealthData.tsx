import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';

const useHealthData = (date: Date) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [flights, setFlights] = useState(0);

  const permissions: HealthKitPermissions = {
    permissions: {
      read: [
        AppleHealthKit.Constants.Permissions.Steps,
        AppleHealthKit.Constants.Permissions.FlightsClimbed,
        AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
      ],
      write: [],
    },
  };

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    AppleHealthKit.isAvailable((err, isAvailable) => {
      if (err || !isAvailable) {
        console.log('HealthKit is not available');
        return;
      }

      AppleHealthKit.initHealthKit(permissions, err => {
        if (err) {
          console.log('Error getting permissions');
          return;
        }
        setHasPermission(true);
      });
    });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      return;
    }

    const options: HealthInputOptions = {
      date: date.toISOString(), // Use the selected date
      includeManuallyAdded: false,
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log('Error getting step count');
        return;
      }
      setSteps(results.value);
    });

    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log('Error getting flights climbed');
        return;
      }
      setFlights(results.value);
    });

    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log('Error getting distance');
        return;
      }
      setDistance(results.value);
    });
  }, [hasPermission, date]); // Added `date` to the dependency array

  return {
    steps,
    distance,
    flights,
  };
};

export default useHealthData;
