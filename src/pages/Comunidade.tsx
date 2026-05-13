import React, { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import { Heart, MessageCircle, Send, Share2 } from 'lucide-react';
import '../styles/Comunidade.css';

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  likedByMe: boolean;
}

const defaultPosts: Post[] = [
  {
    id: 1,
    author: 'Maria Silva',
    avatar: 'M',
    time: 'Há 2 horas',
    content: 'Hoje completei minha última sessão de quimioterapia! Foi uma jornada muito difícil, mas com o apoio da família e dos médicos, eu consegui. Nunca desistam, guerreiros! 💪✨',
    likes: 124,
    comments: 15,
    likedByMe: false
  },
  {
    id: 2,
    author: 'João Pedro',
    avatar: 'J',
    time: 'Há 5 horas',
    content: 'Alguém tem alguma dica para aliviar a náusea nos primeiros dias após o ciclo? Tenho tomado o remédio prescrito, mas queria saber se existem alimentos específicos que ajudam.',
    likes: 45,
    comments: 28,
    likedByMe: true
  },
  {
    id: 3,
    author: 'Ana Clara',
    avatar: 'A',
    time: 'Ontem',
    content: 'Minha primeira tomografia de controle veio limpa! Estou muito grata e emocionada. Queria compartilhar com vocês porque essa comunidade me deu muita força quando eu recebi o diagnóstico.',
    likes: 342,
    comments: 56,
    likedByMe: false
  },
  {
    id: 4,
    author: 'Roberto Almeida',
    avatar: 'R',
    time: 'Ontem',
    content: 'Hoje faz um ano que terminei meu tratamento. Só passando para lembrar a todos que dias melhores virão. Continuem firmes!',
    likes: 512,
    comments: 42,
    likedByMe: true
  },
  {
    id: 5,
    author: 'Camila Costa',
    avatar: 'C',
    time: 'Há 2 dias',
    content: 'Gente, descobri um chá de gengibre com hortelã que está salvando meu estômago essa semana. Recomendo muito conversar com o nutricionista de vocês sobre isso!',
    likes: 89,
    comments: 12,
    likedByMe: false
  },
  {
    id: 6,
    author: 'Fernando Souza',
    avatar: 'F',
    time: 'Há 3 dias',
    content: 'Iniciando a radioterapia amanhã. Um pouco nervoso, mas confiante de que é mais um passo rumo à cura. Mandem energias positivas! 🙏',
    likes: 210,
    comments: 88,
    likedByMe: false
  }
];

const Comunidade: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('@oncocare:comunidade_posts_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultPosts;
      }
    }
    return defaultPosts;
  });

  useEffect(() => {
    localStorage.setItem('@oncocare:comunidade_posts_v2', JSON.stringify(posts));
  }, [posts]);

  const [newPost, setNewPost] = useState('');

  const toggleLike = (id: number) => {
    setPosts(prev => prev.map(post => {
      if (post.id === id) {
        return {
          ...post,
          likedByMe: !post.likedByMe,
          likes: post.likedByMe ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handlePostar = () => {
    if (!newPost.trim()) return;
    
    const post: Post = {
      id: Date.now(),
      author: 'Michael Cuccione',
      avatar: 'M',
      time: 'Agora',
      content: newPost,
      likes: 0,
      comments: 0,
      likedByMe: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="page-container">
      <TopBar title="Comunidade" />
      
      <div className="comunidade-content">
        <div className="comunidade-header">
          <h2>Rede de Apoio</h2>
          <p>Compartilhe experiências, tire dúvidas e encontre força na nossa comunidade.</p>
        </div>

        {/* Feed */}
        <div className="feed-list">
          {posts.map(post => (
            <div className="post-card fade-in" key={post.id}>
              <div className="post-header">
                <div className="post-avatar">{post.avatar}</div>
                <div className="post-meta">
                  <h4>{post.author}</h4>
                  <span>{post.time}</span>
                </div>
              </div>
              <div className="post-body">
                <p>{post.content}</p>
              </div>
              <div className="post-footer">
                <button 
                  className={`post-action-btn ${post.likedByMe ? 'liked' : ''}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart size={18} fill={post.likedByMe ? 'currentColor' : 'none'} />
                  <span>{post.likes}</span>
                </button>
                <button className="post-action-btn">
                  <MessageCircle size={18} />
                  <span>{post.comments}</span>
                </button>
                <button className="post-action-btn share-btn">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Post (Floating Bottom) */}
      <div className="create-post-card floating">
        <div className="create-post-input-wrapper" style={{ alignItems: 'center' }}>
          <div className="avatar-small">M</div>
          <textarea 
            placeholder="Compartilhe algo..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows={1}
          ></textarea>
          <button 
            className={`btn-postar icon-only ${newPost.trim() ? 'active' : ''}`}
            onClick={handlePostar}
            disabled={!newPost.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Comunidade;
