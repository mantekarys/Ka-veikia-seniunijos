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

        public virtual DbSet<Answer> Answer { get; set; }
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
                optionsBuilder.UseMySQL("Server=remotemysql.com;Database=Database;User ID= Database; password = wElEvnn5cl;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>(entity =>
            {
                entity.HasIndex(e => e.FkQuestionId)
                    .HasName("fk_QuestionID");

                entity.HasIndex(e => e.FkUserId)
                    .HasName("fk_UserID");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(5)");

                entity.Property(e => e.FkQuestionId)
                    .HasColumnName("fk_questionID")
                    .HasColumnType("int(5)");

                entity.Property(e => e.FkUserId)
                    .HasColumnName("fk_userID")
                    .HasColumnType("int(5)");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text");
                entity.Property(e => e.Date)
                    .IsRequired()
                    .HasDefaultValueSql("CurrentTimestamp()");

                entity.HasOne(d => d.FkQuestion)
                    .WithMany(p => p.Answer)
                    .HasForeignKey(d => d.FkQuestionId)
                    .HasConstraintName("fk_QuestionID");

                entity.HasOne(d => d.FkUser)
                    .WithMany(p => p.Answer)
                    .HasForeignKey(d => d.FkUserId)
                    .HasConstraintName("fk_UserID");
            });

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
                entity.HasIndex(e => e.EldershipFk)
                    .HasName("eldership_FK");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50);

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description");

                entity.Property(e => e.EldershipFk)
                    .HasColumnName("eldership_FK")
                    .HasColumnType("int(11)");

                entity.Property(e => e.EndTime).HasColumnName("endTime");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.PostDate)
                    .HasColumnName("postDate")
                    .HasColumnType("date")
                    .HasDefaultValueSql("'curdate()'");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.StartTime).HasColumnName("startTime");

                entity.HasOne(d => d.EldershipFkNavigation)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.EldershipFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Event_ibfk_1");
            });

            modelBuilder.Entity<Message>(entity =>
            {
                entity.HasIndex(e => e.FkEldership)
                    .HasName("eldership_message");

                entity.HasIndex(e => e.FkUser)
                    .HasName("user_message");

                entity.HasIndex(e => e.Reply)
                    .HasName("reply_message");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FkEldership)
                    .HasColumnName("fk_eldership")
                    .HasColumnType("int(11)");

                entity.Property(e => e.FkUser)
                    .HasColumnName("fk_user")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Receiver)
                    .IsRequired()
                    .HasColumnName("receiver")
                    .HasMaxLength(20);

                entity.Property(e => e.ReceiverType)
                    .IsRequired()
                    .HasColumnName("receiverType")
                    .HasMaxLength(20);

                entity.Property(e => e.Reply)
                    .HasColumnName("reply")
                    .HasColumnType("int(11)");

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

                entity.HasOne(d => d.ReplyNavigation)
                    .WithMany(p => p.InverseReplyNavigation)
                    .HasForeignKey(d => d.Reply)
                    .HasConstraintName("reply_message");
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
                entity.HasIndex(e => e.EldershipFk)
                    .HasName("eldership_fk");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.EldershipFk)
                    .HasColumnName("eldership_fk")
                    .HasColumnType("int(11)");

                entity.Property(e => e.PostDate)
                    .HasColumnName("postDate")
                    .HasColumnType("date");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text");

                entity.HasOne(d => d.EldershipFkNavigation)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.EldershipFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Post_ibfk_1");
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

                entity.Property(e => e.Rating)
                    .HasColumnName("rating")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Text)
                    .IsRequired()
                    .HasColumnName("text")
                    .HasMaxLength(20);

                entity.HasOne(d => d.ForeignSurveyNavigation)
                    .WithMany(p => p.Question)
                    .HasForeignKey(d => d.ForeignSurvey)
                    .HasConstraintName("survey_question");
            });

            modelBuilder.Entity<Survey>(entity =>
            {
                entity.HasIndex(e => e.EldershipFk)
                    .HasName("eldership_survey");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.PostDate)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.EldershipFk)
                    .HasColumnName("eldership_FK")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);

                entity.HasOne(d => d.EldershipFkNavigation)
                    .WithMany(p => p.Survey)
                    .HasForeignKey(d => d.EldershipFk)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("eldership_survey");
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
