import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHandsHelping, FaStar, FaRocket, FaUserTie, FaArrowLeft, FaChevronDown } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  background: linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)),
              url('https://images.pexels.com/photos/6262454/pexels-photo-6262454.jpeg');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border: 2px solid #000;
  border-radius: 8px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background: #f5f5f5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(45, 52, 54, 1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #2d3436;
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  padding: 15px;
  border: 2px solid rgba(224, 224, 224, 0.8);
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  min-height: 120px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.9);
  
  &:focus {
    border-color: rgba(108, 92, 231, 0.8);
    box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5f4dd0;
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
`;

const StyledBadgeIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBadgeLabel = styled.span`
  font-size: 16px;
  color: #2d3436;
`;

const CustomSelect = styled.div`
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
`;

const SelectedItem = styled.div`
  padding: 15px;
  border: 2px solid rgba(224, 224, 224, 0.8);
  border-radius: 10px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(108, 92, 231, 0.8);
    background: rgba(255, 255, 255, 1);
  }
`;

const SelectContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ArrowIcon = styled(FaChevronDown)`
  color: #2d3436;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  margin-top: 5px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  max-height: 250px;
  overflow-y: auto;
`;

const DropdownItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(108, 92, 231, 0.1);
  }

  ${props => props.selected && `
    background: rgba(108, 92, 231, 0.1);
  `}
`;

function GiveKudos() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    recipient: '',
    recipientName: '',
    badge: '',
    message: ''
  });
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isBadgeDropdownOpen, setIsBadgeDropdownOpen] = useState(false);

  const badges = [
    { id: 'Helping Hand', name: 'Helping Hand', icon: <FaHandsHelping color="#4834d4" size={24} /> },
    { id: 'Excellence', name: 'Excellence', icon: <FaStar color="#ffd700" size={24} /> },
    { id: 'Above and Beyond', name: 'Above and Beyond', icon: <FaRocket color="#e056fd" size={24} /> },
    { id: 'Client Focus', name: 'Client Focus', icon: <FaUserTie color="#20bf6b" size={24} /> }
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const senderName = localStorage.getItem('userName');

    
    if (formData.recipientName === senderName) {
      setError("You cannot give kudos to yourself.");
      setLoading(false);
      return;
    }

    const kudoData = {
      sender: senderName,
      recipient: formData.recipientName,
      badge: formData.badge,
      message: formData.message,
      likes: 0,
      likedBy: []
    };

    try {
      const response = await fetch('http://localhost:5000/api/kudos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kudoData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit kudos');
      }

      setFormData({ 
        recipient: '', 
        recipientName: '', 
        badge: '', 
        message: '' 
      });
      
      navigate('/home');
    } catch (err) {
      console.error('Error submitting kudos:', err);
      setError(err.message || 'Failed to submit kudos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'recipient') {
      const selectedUser = users.find(user => user._id === e.target.value);
      setFormData({
        ...formData,
        recipient: e.target.value,
        recipientName: selectedUser ? selectedUser.name : ''
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleBadgeSelect = (badgeId) => {
    setFormData(prev => ({
      ...prev,
      badge: badgeId
    }));
    setIsBadgeDropdownOpen(false);
  };

  const getSelectedBadge = () => {
    return badges.find(badge => badge.id === formData.badge) || null;
  };

  const getSelectedUser = () => {
    return users.find(user => user._id === formData.recipient) || null;
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/home')}>
          <FaArrowLeft /> 
        </BackButton>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Title>Give Kudos</Title>

        <CustomSelect>
          <SelectedItem onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}>
            <SelectContent>
              {getSelectedUser() ? (
                <span>{getSelectedUser().name}</span>
              ) : (
                <span>Select the user you want to give kudos to</span>
              )}
            </SelectContent>
            <ArrowIcon isOpen={isUserDropdownOpen} />
          </SelectedItem>

          <DropdownList isOpen={isUserDropdownOpen}>
            {users.map(user => (
              <DropdownItem
                key={user._id}
                selected={formData.recipient === user._id}
                onClick={() => {
                  handleChange({ 
                    target: { 
                      name: 'recipient', 
                      value: user._id 
                    } 
                  });
                  setIsUserDropdownOpen(false);
                }}
              >
                <span>{user.name}</span>
              </DropdownItem>
            ))}
          </DropdownList>
        </CustomSelect>

        <CustomSelect>
          <SelectedItem onClick={() => setIsBadgeDropdownOpen(!isBadgeDropdownOpen)}>
            <SelectContent>
              {getSelectedBadge() ? (
                <>
                  <StyledBadgeIcon>{getSelectedBadge().icon}</StyledBadgeIcon>
                  <StyledBadgeLabel>{getSelectedBadge().name}</StyledBadgeLabel>
                </>
              ) : (
                <span>Select a badge</span>
              )}
            </SelectContent>
            <ArrowIcon isOpen={isBadgeDropdownOpen} />
          </SelectedItem>

          <DropdownList isOpen={isBadgeDropdownOpen}>
            {badges.map(badge => (
              <DropdownItem
                key={badge.id}
                selected={formData.badge === badge.id}
                onClick={() => {
                  handleBadgeSelect(badge.id);
                  setIsBadgeDropdownOpen(false);
                }}
              >
                <StyledBadgeIcon>{badge.icon}</StyledBadgeIcon>
                <StyledBadgeLabel>{badge.name}</StyledBadgeLabel>
              </DropdownItem>
            ))}
          </DropdownList>
        </CustomSelect>

        <TextArea
          name="message"
          placeholder="Write your kudos message..."
          value={formData.message}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Give Kudos'}
        </Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
}

export default GiveKudos;