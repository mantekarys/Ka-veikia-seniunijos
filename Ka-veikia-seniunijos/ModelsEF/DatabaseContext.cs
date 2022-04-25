using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Ka_veikia_seniunijos.ModelsEF
{
    public partial class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Eldership> Eldership { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<Place> Place { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<Question> Question { get; set; }
        public virtual DbSet<Survey> Survey { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySQL("Server=remotemysql.com;Database=BSJ0CVGChE;User ID= BSJ0CVGChE; password = wElEvnn5cl;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Eldership>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("email")
                    .IsUnique();

                entity.HasIndex(e => e.Name)
                    .HasName("name")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Municipality)
                    .IsRequired()
                    .HasColumnName("municipality")
                    .HasMaxLength(30);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);

                entity.Property(e => e.PasswordHashed)
                    .IsRequired()
                    .HasColumnName("passwordHashed")
                    .HasMaxLength(60);
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.Eldership)
                    .IsRequired()
                    .HasColumnName("eldership")
                    .HasMaxLength(20);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasColumnName("id")
                    .HasMaxLength(8);

                entity.Property(e => e.Municipality)
                    .IsRequired()
                    .HasColumnName("municipality")
                    .HasMaxLength(15);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasIndex(e => e.FkEldership)
                    .HasName("eldership_message");

                entity.HasIndex(e => e.FkUser)
                    .HasName("user_message");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.FkEldership)
                    .HasColumnName("fk_eldership")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FkUser)
                    .HasColumnName("fk_user")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Received).HasColumnName("received");

                entity.Property(e => e.Receiver)
                    .IsRequired()
                    .HasColumnName("receiver")
                    .HasMaxLength(20);

                entity.Property(e => e.ReceiverType)
                    .IsRequired()
                    .HasColumnName("receiverType")
                    .HasMaxLength(20);

                entity.Property(e => e.Reply).HasColumnName("reply");

                entity.Property(e => e.Sender)
                    .IsRequired()
                    .HasColumnName("sender")
                    .HasMaxLength(20);

                entity.Property(e => e.SenderType)
                    .IsRequired()
                    .HasColumnName("senderType")
                    .HasMaxLength(20);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text");

                entity.Property(e => e.Topic)
                    .HasColumnName("topic")
                    .HasMaxLength(20);

                entity.HasOne(d => d.FkEldershipNavigation)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d => d.FkEldership)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("eldership_message");

                entity.HasOne(d => d.FkUserNavigation)
                    .WithMany(p => p.Message)
                    .HasForeignKey(d => d.FkUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_message");
            });

            modelBuilder.Entity<Place>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.Eldership)
                    .IsRequired()
                    .HasColumnName("eldership")
                    .HasMaxLength(30);

                entity.Property(e => e.Id)
                    .IsRequired()
                    .HasMaxLength(8);

                entity.Property(e => e.Latitude).HasColumnName("latitude");

                entity.Property(e => e.Longtitude).HasColumnName("longtitude");

                entity.Property(e => e.Municipality)
                    .IsRequired()
                    .HasColumnName("municipality")
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasMaxLength(30);
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.HasIndex(e => e.Eldership)
                    .HasName("Eldership_post");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Eldership)
                    .IsRequired()
                    .HasColumnName("eldership")
                    .HasMaxLength(20);

                entity.Property(e => e.Header)
                    .IsRequired()
                    .HasColumnName("header")
                    .HasMaxLength(50);

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text");

                entity.HasOne(d => d.EldershipNavigation)
                    .WithMany(p => p.Post)
                    .HasPrincipalKey(p => p.Name)
                    .HasForeignKey(d => d.Eldership)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Eldership_post");
            });

            modelBuilder.Entity<Question>(entity =>
            {
                entity.HasIndex(e => e.ForeignSurvey)
                    .HasName("survey_question");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.ForeignSurvey)
                    .HasColumnName("foreign_survey")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Number)
                    .HasColumnName("number")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text")
                    .HasMaxLength(20);

                entity.HasOne(d => d.ForeignSurveyNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.ForeignSurvey)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("survey_question");
            });

            modelBuilder.Entity<Survey>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Eldership)
                    .IsRequired()
                    .HasColumnName("eldership")
                    .HasMaxLength(20);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("int(20)");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("email")
                    .IsUnique();

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(6)");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasColumnName("firstName")
                    .HasMaxLength(30);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasColumnName("lastName")
                    .HasMaxLength(30);

                entity.Property(e => e.Municipality)
                    .IsRequired()
                    .HasColumnName("municipality")
                    .HasMaxLength(30);

                entity.Property(e => e.PasswordHashed)
                    .IsRequired()
                    .HasColumnName("passwordHashed")
                    .HasMaxLength(60);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
