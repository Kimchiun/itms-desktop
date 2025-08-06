import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import styled from 'styled-components';
import { 
  setReleases, 
  setSelectedRelease, 
  setLoading, 
  setError, 
  setReleaseStats,
  setSearchQuery,
  setStatusFilter,
  clearFilters
} from '../store/releaseSlice';
import { Release, ReleaseStats } from '../types';
import ReleaseList from './ReleaseList';
import ReleaseDetail from './ReleaseDetail';
import ReleaseModal from './ReleaseModal';
import SearchAndFilter from './SearchAndFilter';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8fafc;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
`;

const StatCard = styled.div`
  flex: 1;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

const LeftPanel = styled.div<{ isCollapsed: boolean }>`
  width: ${props => props.isCollapsed ? '0px' : '400px'};
  border-right: ${props => props.isCollapsed ? 'none' : '1px solid #e5e7eb'};
  background: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
`;

const RightPanel = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
`;

const CollapseButton = styled.button<{ isCollapsed: boolean }>`
  position: absolute;
  top: 50%;
  right: ${props => props.isCollapsed ? '-15px' : '-15px'};
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: white;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background: #f9fafb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  svg {
    width: 16px;
    height: 16px;
    color: #6b7280;
    transition: transform 0.2s ease;
    transform: ${props => props.isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

const LeftPanelWrapper = styled.div`
  position: relative;
`;

const CreateButton = styled.button`
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #2563eb;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #6b7280;
  text-align: center;
  padding: 40px;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0;
  max-width: 300px;
`;

const LoadingState = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6b7280;
`;

const ErrorState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ef4444;
  text-align: center;
  padding: 40px;
`;

const ReleaseManagementPage: React.FC = () => {
  console.log('🎯 ReleaseManagementPage 렌더링 시작 - 컴포넌트 함수 실행됨');
  
  const dispatch = useDispatch();
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(() => {
    const saved = localStorage.getItem('release-management-left-panel-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const { 
    releases, 
    selectedRelease, 
    releaseStats, 
    loading, 
    error,
    searchQuery,
    statusFilter
  } = useSelector((state: RootState) => state.releases);
  
  console.log('📊 ReleaseManagementPage 상태:', {
    releasesCount: releases.length,
    selectedRelease: selectedRelease?.name,
    loading,
    error,
    releaseStats
  });

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    loadReleases();
    loadReleaseStats();
  }, []);
  


  const loadReleases = async () => {
    console.log('🔄 릴리즈 목록 로드 시작');
    dispatch(setLoading(true));
    try {
      const response = await fetch('http://localhost:3001/api/releases');
      console.log('📡 릴리즈 API 응답:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('📦 릴리즈 데이터:', data);
        console.log('📊 릴리즈 개수:', data.data?.length || 0);
        dispatch(setReleases(data.data || []));
      } else {
        throw new Error('릴리즈 목록을 불러올 수 없습니다.');
      }
    } catch (error) {
      console.error('❌ 릴리즈 로드 에러:', error);
      dispatch(setError(error instanceof Error ? error.message : '알 수 없는 오류'));
      // 에러가 발생해도 컴포넌트는 렌더링되도록 함
      dispatch(setLoading(false));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const loadReleaseStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/releases/stats');
      if (response.ok) {
        const data = await response.json();
        dispatch(setReleaseStats(data.data));
      }
    } catch (error) {
      console.error('릴리즈 통계 로드 실패:', error);
      // 에러가 발생해도 컴포넌트는 렌더링되도록 함
    }
  };

  const handleReleaseSelect = (release: Release) => {
    dispatch(setSelectedRelease(release));
  };

  const handleCreateRelease = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSuccess = (newRelease: Release) => {
    setIsCreateModalOpen(false);
    loadReleases();
    loadReleaseStats();
  };

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleStatusFilter = (status: string) => {
    dispatch(setStatusFilter(status));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleToggleLeftPanel = () => {
    const newCollapsedState = !isLeftPanelCollapsed;
    setIsLeftPanelCollapsed(newCollapsedState);
    localStorage.setItem('release-management-left-panel-collapsed', JSON.stringify(newCollapsedState));
  };

  const getStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      'PLANNING': '계획',
      'IN_PROGRESS': '진행중',
      'TESTING': '테스트',
      'READY': '준비완료',
      'DEPLOYED': '배포됨',
      'COMPLETED': '완료',
      'CANCELLED': '취소됨'
    };
    return statusLabels[status] || status;
  };

  if (loading && releases.length === 0) {
    return (
      <PageContainer>
        <Header>
          <Title>릴리즈 관리</Title>
        </Header>
        <LoadingState>
          <div>릴리즈 목록을 불러오는 중...</div>
        </LoadingState>
      </PageContainer>
    );
  }

  if (error && releases.length === 0) {
    return (
      <PageContainer>
        <Header>
          <Title>릴리즈 관리</Title>
        </Header>
        <ErrorState>
          <div>❌ {error}</div>
          <button onClick={loadReleases} style={{ marginTop: '16px', padding: '8px 16px' }}>
            다시 시도
          </button>
        </ErrorState>
      </PageContainer>
    );
  }

  console.log('🎯 ReleaseManagementPage return 문 실행 - DOM 렌더링 시작');
  return (
    <PageContainer data-testid="release-management-page">
      <Header>
        <Title>릴리즈 관리</Title>
        <HeaderActions>
          <CreateButton onClick={handleCreateRelease}>
            + 새 릴리즈
          </CreateButton>
        </HeaderActions>
      </Header>

      {releaseStats && (
        <StatsContainer>
          <StatCard>
            <StatValue>{releaseStats.total}</StatValue>
            <StatLabel>전체 릴리즈</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{releaseStats.in_progress}</StatValue>
            <StatLabel>진행중</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{releaseStats.testing}</StatValue>
            <StatLabel>테스트중</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{releaseStats.ready}</StatValue>
            <StatLabel>배포준비</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{releaseStats.deployed}</StatValue>
            <StatLabel>배포완료</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{releaseStats.completed}</StatValue>
            <StatLabel>완료</StatLabel>
          </StatCard>
        </StatsContainer>
      )}

      <MainContent>
        <LeftPanelWrapper>
          <LeftPanel isCollapsed={isLeftPanelCollapsed}>
            {!isLeftPanelCollapsed && (
              <>
                <SearchAndFilter
                  searchQuery={searchQuery}
                  statusFilter={statusFilter}
                  onSearch={handleSearch}
                  onStatusFilter={handleStatusFilter}
                  onClearFilters={handleClearFilters}
                />
                
                {releases.length === 0 ? (
                  <EmptyState>
                    <EmptyIcon>📦</EmptyIcon>
                    <EmptyTitle>릴리즈가 없습니다</EmptyTitle>
                    <EmptyDescription>
                      새 릴리즈를 등록해보세요
                    </EmptyDescription>
                  </EmptyState>
                ) : (
                  <ReleaseList
                    releases={releases}
                    selectedRelease={selectedRelease}
                    onReleaseSelect={handleReleaseSelect}
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                  />
                )}
              </>
            )}
          </LeftPanel>
          <CollapseButton 
            isCollapsed={isLeftPanelCollapsed}
            onClick={handleToggleLeftPanel}
            title={isLeftPanelCollapsed ? '패널 펼치기' : '패널 접기'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </CollapseButton>
        </LeftPanelWrapper>

        <RightPanel>
          {selectedRelease ? (
            <ReleaseDetail 
              release={selectedRelease}
              onReleaseUpdate={loadReleases}
            />
          ) : (
            <EmptyState>
              <EmptyIcon>👈</EmptyIcon>
              <EmptyTitle>릴리즈를 선택하세요</EmptyTitle>
              <EmptyDescription>
                좌측에서 릴리즈를 선택해 상세 정보를 확인하세요
              </EmptyDescription>
            </EmptyState>
          )}
        </RightPanel>
      </MainContent>

      {isCreateModalOpen && (
        <ReleaseModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </PageContainer>
  );
};

export default ReleaseManagementPage;