import {useEffect, useState} from 'react';
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
      //   write: [AppleHealthKit.Constants.Permissions.Steps],
      write: [],
    },
  };

  useEffect(() => {
    AppleHealthKit.initHealthKit(permissions, err => {
      if (err) {
        console.log('Error getting permissions');
        return;
      }
      setHasPermission(true);
    });
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      return;
    }
    const options: HealthInputOptions = {
      date: date.toISOString(), // optional; default now
      includeManuallyAdded: false, // optional: default true
    };

    AppleHealthKit.getStepCount(options, (err, results) => {
      if (err) {
        console.log('Error getting step count');
        return;
      }
      console.log('Step count:', results);
      setSteps(results.value);
    });
    AppleHealthKit.getFlightsClimbed(options, (err, results) => {
      if (err) {
        console.log('Error getting step count');
        return;
      }
      console.log('Flight climed:', results);
      setFlights(results.value);
    });
    AppleHealthKit.getDistanceWalkingRunning(options, (err, results) => {
      if (err) {
        console.log('Error getting step count');
        return;
      }
      console.log('Distrance:', results);
      setDistance(results.value);
    });
  }, [hasPermission]);

  return {
    steps,
    distance,
    flights,
  };
};

export default useHealthData;
