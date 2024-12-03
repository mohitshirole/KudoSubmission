import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaHandsHelping, FaStar, FaRocket, FaUserTie } from 'react-icons/fa';

const HomeContainer = styled.div`
  padding: 20px;
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6)),
              url('https://cdn.pixabay.com/photo/2016/07/15/23/50/guilloche-1520724_1280.png');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Welcome = styled.h1`
  font-size: 24px;
  color: #333;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const GiveKudoButton = styled.button`
  padding: 10px 20px;
  background: white;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #f5f5f5;
  }
`;

const AnalyticsButton = styled.button`
  padding: 10px 15px;
  background: white;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #f5f5f5;
  }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const KudoCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #2d3436;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
  opacity: 0;
  animation: ${slideUp} 0.5s ease forwards;
  animation-delay: ${props => props.index * 0.1}s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  }
`;

const KudoHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const BadgeIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-right: 15px;
`;

const SenderName = styled.span`
  font-weight: bold;
  color: #2d3436;
`;

const RecipientName = styled.span`
  font-weight: bold;
  color: #2d3436;
`;

const BadgeName = styled.span`
  font-weight: 500;
  color: #6c5ce7;
`;

const KudoText = styled.div`
  flex: 1;
  line-height: 1.4;
`;

const KudoMessage = styled.p`
  margin: 10px 0;
  color: #2d3436;
  font-size: 1.1em;
  line-height: 1.5;
  font-style: italic;
`;

const KudoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid #eee;
`;

const TimeStamp = styled.span`
  color: #a4b0be;
  font-size: 0.9em;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
  padding: 5px;
  color: ${props => props.disabled ? '#ff6b6b' : '#666'};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${props => props.disabled ? 1 : 0.7};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const LikeCount = styled.span`
  margin-left: 5px;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: red;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: center;
`;

function Home() {
  const [kudos, setKudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchKudos();
  }, []);

  const fetchKudos = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/kudos');
      if (!response.ok) {
        throw new Error('Failed to fetch kudos');
      }
      const data = await response.json();
      setKudos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching kudos:', error);
      setError('Failed to fetch kudos');
      setLoading(false);
    }
  };

  const handleLike = async (kudoId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/kudos/${kudoId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Like error response:', errorData);
        throw new Error('Failed to like kudo');
      }

      const updatedKudo = await response.json();
      setKudos(kudos.map(kudo => 
        kudo._id === kudoId ? updatedKudo : kudo
      ));
    } catch (error) {
      console.error('Like error:', error);
      setError('Failed to like the kudo');
      setTimeout(() => setError(''), 3000);
    }
  };

  const getBadgeIcon = (badgeType) => {
    switch (badgeType) {
      case 'Helping Hand':
        return <FaHandsHelping color="#4834d4" size={24} />;
      case 'Excellence':
        return <FaStar color="#ffd700" size={24} />;
      case 'Above and Beyond':
        return <FaRocket color="#e056fd" size={24} />;
      case 'Client Focus':
        return <FaUserTie color="#20bf6b" size={24} />;
      default:
        return null;
    }
  };

  if (loading) return <LoadingMessage>Loading kudos...</LoadingMessage>;

  return (
    <HomeContainer>
      <Header>
        <Welcome>Welcome {userName}!</Welcome>
        <ButtonContainer>
          <GiveKudoButton onClick={() => navigate('/give-kudos')}>
            Give Kudo
          </GiveKudoButton>
          <AnalyticsButton onClick={() => navigate('/analytics')}>
            📊
          </AnalyticsButton>
        </ButtonContainer>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FeedContainer>
        {kudos.map((kudo, index) => (
          <KudoCard key={kudo._id} index={index}>
            <KudoHeader>
              <BadgeIconContainer>
                {getBadgeIcon(kudo.badge)}
              </BadgeIconContainer>
              <KudoText>
                <SenderName>{kudo.sender}</SenderName> gave a{' '}
                <BadgeName>{kudo.badge}</BadgeName> to{' '}
                <RecipientName>{kudo.recipient}</RecipientName>
              </KudoText>
            </KudoHeader>
            <KudoMessage>"{kudo.message}"</KudoMessage>
            <KudoFooter>
              <LikeButton 
                onClick={() => handleLike(kudo._id)}
                disabled={kudo.likedBy?.includes(userName)}
              >
                {kudo.likedBy?.includes(userName) ? (
                  <FaHeart color="red" />
                ) : (
                  <FaRegHeart />
                )}
                <LikeCount>{kudo.likes || 0}</LikeCount>
              </LikeButton>
              <TimeStamp>
                {new Date(kudo.createdAt).toLocaleDateString()}
              </TimeStamp>
            </KudoFooter>
          </KudoCard>
        ))}
      </FeedContainer>
    </HomeContainer>
  );
}

export default Home; 