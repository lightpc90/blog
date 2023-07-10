import React, { useState, useEffect,  } from 'react';
import { Text, Card, Spacer, Container} from '@nextui-org/react';

const CountdownTimer = ({scheduledDate, setDisableDelete, setDisablePublish, setShowPicker, handleStopSchedule, handlePublish}) => {
    const calculateTimeRemaining = () => {
        const now = new Date().getTime();
        const target = new Date(scheduledDate).getTime();
        const total = target - now;
    
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((total % (1000 * 60)) / 1000);
    
        return { total, days, hours, minutes, seconds };
      };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(timer);
        handleStopSchedule()
        handlePublish()
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);


  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const renderCountdown = () => {
    if (timeRemaining.total > 0) {
      setDisableDelete(true)
      setDisablePublish(true)
      setShowPicker(false)
      return (
        <>
            <Text weight='bold'>Going Live In...</Text>
          <Container 
              css={{
                  p: '0',
                  textGradient: "45deg, $purple600 -20%, $pink600 100%",
              }}
              align='center'>
            <Text 
              weight='bold'
              >{`${formatTime(timeRemaining.days)}d ${formatTime(timeRemaining.hours)}h ${formatTime(
                timeRemaining.minutes
              )}m ${formatTime(timeRemaining.seconds)}s`}
            </Text>
          </Container>  
        </>
      );
    } else {
      return (
        <>
          <p>No active schedule</p>
        </>
      );
    }
  };

  return <div>{renderCountdown()}</div>;
};

export default CountdownTimer;
