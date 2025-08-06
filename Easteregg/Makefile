# ======================
# Hello.c 编译配置
# ======================
TARGET     = hello
CC         = gcc
SRC        = Hello.c
CFLAGS     = -Wall -Wextra -O2
LDFLAGS    = 
OBJ        = $(SRC:.c=.o)

# 跨平台支持 (Windows/Mac/Linux)
ifeq ($(OS),Windows_NT)
	RM = del /Q
	EXEC = $(TARGET).exe
else
	RM = rm -f
	EXEC = ./$(TARGET)
	UNAME := $(shell uname)
	ifeq ($(UNAME),Darwin)
		# macOS 特殊设置
		CFLAGS += -Wno-unused-parameter
	endif
endif

# ======================
# 主要构建目标
# ======================
all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

# ======================
# 实用命令
# ======================
run: $(TARGET)
	@echo "\033[1;32m==== 运行程序 ====\033[0m"
	@$(EXEC)

debug: CFLAGS += -g -DDEBUG
debug: clean $(TARGET)
	@echo "\033[1;33mDEBUG 版本已构建\033[0m"

clean:
	@$(RM) $(TARGET) $(OBJ) *.exe 2>/dev/null || true
	@echo "清理完成"

help:
	@echo "\033[1;34m==== Makefile 帮助 ====\033[0m"
	@echo "make all    - 编译程序 (默认)"
	@echo "make run    - 编译并运行"
	@echo "make debug  - 构建调试版本"
	@echo "make clean  - 清理构建文件"
	@echo "make help   - 显示帮助信息"

.PHONY: all run clean help debug