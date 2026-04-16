import { useNavigate, useParams } from 'react-router-dom';
import { useJourney } from './JourneyProvider';

export function useScreenNav() {
  const navigate = useNavigate();
  const { journeyId } = useParams();
  const { getNextScreen, getPrevScreen, screens } = useJourney();

  return {
    goNext: (currentId) => {
      const next = getNextScreen(currentId);
      if (next) navigate(`/${journeyId}/${next.id}`);
    },
    goPrev: (currentId) => {
      const prev = getPrevScreen(currentId);
      if (prev) navigate(`/${journeyId}/${prev.id}`);
    },
    goTo: (screenId) => navigate(`/${journeyId}/${screenId}`),
    goFirst: () => {
      if (screens[0]) navigate(`/${journeyId}/${screens[0].id}`);
    },
  };
}
