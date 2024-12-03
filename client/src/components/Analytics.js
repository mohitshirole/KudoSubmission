import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrophy, FaHeart, FaHandsHelping, FaStar, FaRocket, FaUserTie } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend
);

const AnalyticsContainer = styled.div`
  padding: 20px;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)),
              url('https://images.pexels.com/photos/8773907/pexels-photo-8773907.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  border: 2px solid rgba(0, 0, 0, 0.1);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #2d3436;
  flex-grow: 1;
  text-align: center;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  border: 2px solid rgba(45, 52, 54, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.95);
    border-color: rgba(45, 52, 54, 0.5);
  }
`;

const LeaderboardCard = styled(Card)`
  grid-column: 2;
  grid-row: 1 / span 2;

  @media (max-width: 768px) {
    grid-column: 1;
    grid-row: auto;
  }
`;

const KudosDistributionCard = styled(Card)`
`;

const MostLikedPost = styled(Card)`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  color: #2d3436;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.8);
  }
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid rgba(233, 236, 239, 0.8);
  color: #2d3436;
  background-color: rgba(255, 255, 255, 0.9);
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(233, 236, 239, 0.8);
`;

const RankCell = styled(TableCell)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PostText = styled.p`
  color: #2d3436;
  font-size: 1.1em;
  line-height: 1.5;
  font-style: italic;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #2d3436;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 230, 230, 0.9);
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 107, 107, 0.3);
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #2d3436;
  
  &:hover {
    color: #636e72;
  }
`;

const KudoItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const KudoSender = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const KudoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #6c5ce7;
  margin-bottom: 5px;
`;

const ModalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 20px;
`;

const BadgeStatsCard = styled.div`
  background: rgba(248, 249, 250, 0.9);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

function Analytics() {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState({
    kudosGiven: {},
    leaderboard: [],
    mostLikedPost: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userKudos, setUserKudos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserKudos = async (userName) => {
    try {
      const url = `http://localhost:5000/api/kudos/user/${userName}`;
      console.log('Fetching kudos from:', url);

      const response = await fetch(url);
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error('Failed to fetch user kudos');
      }

      const data = await response.json();
      console.log('Received data:', data);
      setUserKudos(data);
      setSelectedUser(userName);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Full error details:', err);
      setError('Failed to fetch user kudos');
    }
  };

  const chartData = {
    labels: ['Helping Hand', 'Excellence', 'Above and Beyond', 'Client Focus'],
    datasets: [{
      label: 'Kudos Given',
      data: ['Helping Hand', 'Excellence', 'Above and Beyond', 'Client Focus'].map(
        badge => analyticsData.kudosGiven[badge] || 0
      ),
      backgroundColor: [
        '#4834d4',  
        '#ffd700',  
        '#e056fd',  
        '#20bf6b',  
      ],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        afterDataLimits: (scale) => {
          scale.max = scale.max + 1;
        }
      },
      x: {
        display: true,
        ticks: {
          autoSkip: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Kudos Given: ${context.raw}`;
          }
        }
      }
    },
    indexAxis: 'x',
    barThickness: 40,
    maxBarThickness: 50,
    barPercentage: 0.9,
    categoryPercentage: 0.8
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

  const generateUserBadgeStats = (kudos) => {
  
    const badgeOrder = [
      'Helping Hand',
      'Excellence',
      'Above and Beyond',
      'Client Focus'
    ];

    
    const badgeCounts = badgeOrder.reduce((acc, badge) => {
      acc[badge] = 0;
      return acc;
    }, {});

   
    kudos.forEach(kudo => {
      if (badgeCounts.hasOwnProperty(kudo.badge)) {
        badgeCounts[kudo.badge]++;
      }
    });

    return {
      labels: badgeOrder,
      datasets: [{
        data: badgeOrder.map(badge => badgeCounts[badge]),
        backgroundColor: [
          '#4834d4',  
          '#ffd700',  
          '#e056fd',  
          '#20bf6b',  
        ],
        borderWidth: 1
      }]
    };
  };

  if (loading) return <LoadingMessage>Loading analytics...</LoadingMessage>;

  return (
    <AnalyticsContainer>
      <Header>
        <BackButton onClick={() => navigate('/home')}>
          <FaArrowLeft /> 
        </BackButton>
        <PageTitle>Analytics Dashboard</PageTitle>
      </Header>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ContentGrid>
        <KudosDistributionCard>
          <SectionTitle>Kudos Distribution</SectionTitle>
          <Bar data={chartData} options={chartOptions} />
        </KudosDistributionCard>

        <LeaderboardCard>
          <SectionTitle>
            <FaTrophy color="#ffd700" /> Top Kudos Recipients
          </SectionTitle>
          <LeaderboardTable>
            <thead>
              <tr>
                <TableHeader>Rank</TableHeader>
                <TableHeader>Name</TableHeader>
                <TableHeader>Kudos</TableHeader>
              </tr>
            </thead>
            <tbody>
              {analyticsData.leaderboard.map((user, index) => (
                <TableRow key={user.name}>
                  <RankCell>
                    {index + 1}
                    {index === 0 && <FaTrophy color="#ffd700" />}
                    {index === 1 && <FaTrophy color="#C0C0C0" />}
                    {index === 2 && <FaTrophy color="#CD7F32" />}
                  </RankCell>
                  <TableCell 
                    onClick={() => fetchUserKudos(user.name)}
                    style={{ cursor: 'pointer', color: '#6c5ce7' }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell>{user.kudosReceived}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </LeaderboardTable>
        </LeaderboardCard>

        <MostLikedPost>
          <SectionTitle>
            <FaHeart color="#ff6b6b" /> Most Liked Kudo
          </SectionTitle>
          <PostText>{analyticsData.mostLikedPost}</PostText>
        </MostLikedPost>
      </ContentGrid>

      {isModalOpen && (
        <Modal onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <CloseButton onClick={() => setIsModalOpen(false)}>×</CloseButton>
            <SectionTitle>Kudos Received for {selectedUser}</SectionTitle>
            
            <BadgeStatsCard>
              <SectionTitle style={{ fontSize: '1.2em' }}>Badge Distribution</SectionTitle>
              <Bar 
                data={generateUserBadgeStats(userKudos)}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'bottom'
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Count: ${context.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1
                      },
                      min: 0,
                      max: Math.max(...Object.values(generateUserBadgeStats(userKudos).datasets[0].data)) + 1
                    },
                    x: {
                      display: true,
                      ticks: {
                        autoSkip: false
                      }
                    }
                  },
                  indexAxis: 'x',
                  barThickness: 40,
                  maxBarThickness: 50,
                  barPercentage: 0.9,
                  categoryPercentage: 0.8,
                }}
              />
            </BadgeStatsCard>

            <ModalGrid>
              {userKudos.map((kudo, index) => (
                <KudoItem key={index}>
                  <KudoSender>From: {kudo.sender}</KudoSender>
                  <KudoBadge>
                    {getBadgeIcon(kudo.badge)} {kudo.badge}
                  </KudoBadge>
                  <PostText>"{kudo.message}"</PostText>
                </KudoItem>
              ))}
            </ModalGrid>
          </ModalContent>
        </Modal>
      )}
    </AnalyticsContainer>
  );
}

export default Analytics;